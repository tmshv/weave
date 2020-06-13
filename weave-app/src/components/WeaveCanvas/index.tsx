import * as PIXI from 'pixi.js';
import { useEffect, useRef } from "react"

type Props = {
    lines: [number, number][]
}

const WeaveCanvas: React.FC<Props> = props => {
    const ref = useRef<HTMLDivElement>()
    const g = useRef<PIXI.Graphics>()

    useEffect(() => {
        // The application will create a renderer using WebGL, if possible,
        // with a fallback to a canvas render. It will also setup the ticker
        // and the root stage PIXI.Container
        const app = new PIXI.Application({
            width: 500,
            height: 500,
        });

        // The application will create a canvas element for you that you
        // can then insert into the DOM
        // document.body.appendChild(app.view);
        ref.current.appendChild(app.view)

        const graphics = new PIXI.Graphics();
        app.stage.addChild(graphics);
        g.current = graphics

        return () => {
            app.view.remove()
        }
    }, [])

    useEffect(() => {
        const graphics = g.current
        graphics.clear()

        const cx = 250;
        const cy = 250;

        // draw a shape
        // graphics.beginFill(0xFF3300);
        graphics.lineStyle(1, 0xffd900, 0.5)
        graphics.moveTo(cx, cy)

        const pins = 100
        const angleStep = (Math.PI * 2) / pins
        for (const [s, e] of props.lines) {
            // const angleStart = angleStep * s
            const angleEnd = angleStep * e
            const r = 200
            const x = cx + Math.cos(angleEnd) * r
            const y = cy + Math.sin(angleEnd) * r

            graphics.lineTo(x, y);
        }

        // graphics.lineTo(100, 400);
        // graphics.lineTo(50, 350);
        graphics.closePath();
        graphics.endFill();
    }, [props.lines])

    return (
        <div
            ref={ref}
        // style={{
        //     width: '100px',
        //     height: '100px',
        // }}
        />
    )
}

export default WeaveCanvas
