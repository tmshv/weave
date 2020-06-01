import dynamic from 'next/dynamic';
import { useCallback, useState, FormEvent, useEffect } from 'react';
import { Slider } from "baseui/slider";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { NextPage } from 'next';
import { sampleCoords } from '@/sample';
import { factory } from '@/lib/factory';

const WeaveCanvas = dynamic(import('@/components/WeaveCanvas').then(x => x.WeaveCanvas))

type OnChange = (event: FormEvent<HTMLTextAreaElement>) => void

const Index: NextPage = props => {
    const [value, setValue] = useState('');
    const [lines, setLines] = useState<[number, number][]>([]);
    const [pin, setPin] = useState([0])
    const [[min, max], setMinmax] = useState<[number, number]>([0, 100]);

    const onChange = useCallback<OnChange>(event => {
        setValue(event.currentTarget.value)
    }, [])

    const fillSample = useCallback(() => {
        setValue(sampleCoords())
    }, [])

    useEffect(() => {
        const task = factory(value)

        // setMinmax([task.min, task.max])
        setMinmax([0, task.lines.length])
        setLines(task.lines)
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
                value={pin}
                min={min}
                max={max}
                onChange={({ value }) => value && setPin(value)}
            // onFinalChange={({ value }) => console.log(value)}
            ></Slider>
            <WeaveCanvas
                lines={lines.slice(0, pin[0])}
            />
        </>
    );
}

export default Index
