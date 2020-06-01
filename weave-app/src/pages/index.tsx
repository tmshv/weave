import { styled } from 'baseui';
import dynamic from 'next/dynamic';
import { TreeView, toggleIsExpanded } from "baseui/tree-view";
import { useCallback, useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { Slider } from "baseui/slider";
import { Textarea } from "baseui/textarea";
import { Button } from "baseui/button";
import { NextPage } from 'next';
import { sampleCoords } from '@/sample';
import { factory } from '@/lib/factory';

const WeaveCanvas = dynamic(import('@/components/WeaveCanvas').then(x => x.WeaveCanvas))

export const S = () => {
    const [value, setValue] = useState([27]);

    return (
        <Slider
            value={value}
            onChange={({ value }) => value && setValue(value)}
            onFinalChange={({ value }) => console.log(value)}
            overrides={{
                Thumb: {
                    style: ({ $theme }) => {
                        return {
                            // backgroundColor: $theme.colors.warning600
                            // border: 'none',
                        };
                    }
                },
                //     Root: {
                //         style: ({ $theme }) => {
                //             return {
                //                 outline: `${$theme.colors.warning600} solid`,
                //                 backgroundColor: $theme.colors.warning600
                //             };
                //         }
                //     }
            }}
        />
    );
}

const Centered = styled('div', {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
});

const Tree: React.FC = () => {
    const [data, setData] = useState([
        {
            id: 1,
            label: "The Two Gentlemen of Verona",
            isExpanded: true,
            children: [
                { id: 11, label: "Duke of Milan" },
                {
                    id: 12,
                    label: "Two Gentleman",
                    isExpanded: true,
                    children: [
                        { id: 121, label: "Valentine" },
                        { id: 122, label: "Proteus" }
                    ]
                },
                { id: 13, label: "Silvia" },
                { id: 14, label: "Julia" }
            ]
        },
        {
            id: 2,
            label: "The Tempest",
            isExpanded: false,
            children: [
                { id: 21, label: "Alonso" },
                { id: 22, label: "Sebastian" },
                { id: 23, label: "Prospero" },
                { id: 24, label: "Antonio" }
            ]
        }
    ]);
    return (
        <TreeView
            data={data}
            onToggle={node => {
                setData(prevData =>
                    toggleIsExpanded(prevData, node)
                );
            }}
        />
    );
}

type OnChange = (event: FormEvent<HTMLTextAreaElement>) => void

const Index: NextPage = props => {
    const [value, setValue] = useState('');
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
    }, [value])

    return (
        <>
            {/* <Centered> */}
            {/* <StatefulInput /> */}
            {/* <textarea
            onChange={onChange}></textarea> */}
            <Textarea
                value={value}
                onChange={onChange}
                placeholder="Controlled Input"
                rows={6}
            />
            <Button onClick={() => alert("click")}>Run</Button>
            <Button onClick={fillSample}>Example</Button>

            <Slider
                value={pin}
                min={min}
                max={max}
                onChange={({ value }) => value && setPin(value)}
            // onFinalChange={({ value }) => console.log(value)}
            ></Slider>
            {/* <Tree></Tree> */}
            {/* <S></S> */}
            <WeaveCanvas></WeaveCanvas>
            {/* </Centered> */}
        </>
    );
}

export default Index
