import dynamic from 'next/dynamic';
import { useCallback, useState, FormEvent, useEffect } from 'react';
import { Slider } from "baseui/slider";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { Checkbox } from "baseui/checkbox";
import { NextPage } from 'next';
import { sampleCoords } from '@/sample';
import { factory } from '@/lib/factory';
import { WeaveSolution } from '@/types';

const WeaveCanvas = dynamic(import('@/components/WeaveCanvas'), {
    ssr: false
})

type OnChange = (event: FormEvent<HTMLTextAreaElement>) => void

const Index: NextPage = props => {
    const [value, setValue] = useState('');
    const [sol, setSolution] = useState<WeaveSolution>();
    const [currentLine, setCurrentLine] = useState([0])
    const [[min, max], setMinmax] = useState<[number, number]>([0, 100]);
    const [lineAlpha, setLineAlpha] = useState([1])
    const [hightlightLast, setHL] = useState(false)

    const onChange = useCallback<OnChange>(event => {
        setValue(event.currentTarget.value)
    }, [])

    const fillSample = useCallback(() => {
        setValue(sampleCoords())
    }, [])

    useEffect(() => {
        const solution = factory(value)

        // setMinmax([task.min, task.max])
        setMinmax([1, solution.lines.length])
        setSolution(solution)
    }, [value])

    return (
        <>
            <Textarea
                value={value}
                onChange={onChange}
                placeholder="Controlled Input"
                rows={6}
            />
            {/* <Button onClick={() => alert("click")}>Run</Button> */}
            <Button onClick={fillSample}>Example</Button>

            <Slider
                value={currentLine}
                min={min}
                max={max}
                onChange={({ value }) => value && setCurrentLine(value)}
            ></Slider>

            <Slider
                value={lineAlpha}
                min={0}
                max={1}
                step={0.01}
                onChange={({ value }) => value && setLineAlpha(value)}
            ></Slider>

            <Checkbox
                checked={hightlightLast}
                onChange={e => setHL(e.target.checked)}
                // labelPlacement={LABEL_PLACEMENT.right}
            >
                Hightlight Current Line
            </Checkbox>

            {!sol ? null : (
                <WeaveCanvas
                    lines={sol.lines.slice(0, currentLine[0])}
                    pins={sol.pins}
                    lineAlpha={lineAlpha[0]}
                    lineThickness={1}
                    lineColor={0}
                    highlightLast={hightlightLast}
                />
            )}
        </>
    );
}

export default Index
