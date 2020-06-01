import { styled } from 'baseui';
import { StatefulInput } from 'baseui/input';
import { TreeView, toggleIsExpanded } from "baseui/tree-view";
import { useState } from 'react';
import { Slider } from "baseui/slider";

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

export default function Hello() {
    return (
        <>
            {/* <Centered> */}
            {/* <StatefulInput /> */}
            <Tree></Tree>
            <S></S>
            {/* </Centered> */}
        </>
    );
}
