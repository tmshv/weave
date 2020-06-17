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
    const [lineAlpha, setLineAlpha] = useState([0.1])
    const [radius, setRadius] = useState([200])
    const [hightlightLast, setHL] = useState(false)

    const onChange = useCallback<OnChange>(event => {
        setValue(event.currentTarget.value)
    }, [])

    const fillSample = useCallback(() => {
        setValue(sampleCoords())
    }, [])

    useEffect(() => {
        const solution = factory(value, {
            radius: radius[0],
        })

        // setMinmax([task.min, task.max])
        setMinmax([1, solution.lines.length])
        setSolution(solution)
    }, [radius[0], value])

    return (
        <>
            <div style={{
                display: 'flex',
                position: 'absolute',
                top: 0,
                left: 0,

                width: '100%',
                height: '100%',
            }}>
                <div style={{
                    flex: 3,
                }}>
                    {!sol ? null : (
                        <WeaveCanvas
                            lines={sol.lines.slice(0, currentLine[0])}
                            pins={sol.pins}
                            lineAlpha={lineAlpha[0]}
                            lineThickness={1}
                            lineColor={0}
                            highlightLast={hightlightLast}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                        />
                    )}
                </div>

                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <Textarea
                        value={value}
                        onChange={onChange}
                        placeholder="Controlled Input"
                        rows={6}
                    />

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

                    <Slider
                        value={radius}
                        min={100}
                        max={500}
                        // step={0.01}
                        onChange={({ value }) => value && setRadius(value)}
                    ></Slider>

                    <Checkbox
                        checked={hightlightLast}
                        onChange={e => setHL((e.target as any).checked)}
                    // labelPlacement={LABEL_PLACEMENT.right}
                    >
                        Hightlight Current Line
                    </Checkbox>

                    <div style={{flex: 1}}></div>

                    <Button onClick={fillSample}>Example</Button>
                </div>
            </div>
        </>
    );
}

export default Index
