import * as PIXI from 'pixi.js';
import { useEffect, useRef } from "react"
import { WeaveLine, Pin } from "@/types"

const style = new PIXI.TextStyle({
    // fontFamily: 'Arial',
    fontSize: 10,
    // fontStyle: 'italic',
    // fontWeight: 'bold',
    // fill: ['#ffffff', '#00ff99'], // gradient
    // stroke: '#4a1850',
    // strokeThickness: 5,
    // dropShadow: true,
    // dropShadowColor: '#000000',
    // dropShadowBlur: 4,
    // dropShadowAngle: Math.PI / 6,
    // dropShadowDistance: 6,
    // wordWrap: true,
    // wordWrapWidth: 440,
})

type Props = {
    lines: WeaveLine[]
    pins: Pin[]
    lineColor: number
    lineThickness: number
    lineAlpha: number
    highlightLast: boolean
}

const WeaveCanvas: React.FC<Props> = ({
    lineColor,
    lineAlpha,
    lineThickness,
    ...props
}) => {
    const ref = useRef<HTMLDivElement>()
    const g = useRef<PIXI.Graphics>()
    const labels = useRef<PIXI.Container>()

    useEffect(() => {
        const resolution = window.devicePixelRatio

        // The application will create a renderer using WebGL, if possible,
        // with a fallback to a canvas render. It will also setup the ticker
        // and the root stage PIXI.Container
        const app = new PIXI.Application({
            width: 500,
            height: 500,
            autoDensity: true,
            antialias: true,
            resolution,
            backgroundColor: 0xEEEEEE,
        });

        // The application will create a canvas element for you that you
        // can then insert into the DOM
        // document.body.appendChild(app.view);
        ref.current!.appendChild(app.view)

        const cx = 250;
        const cy = 250;

        g.current = new PIXI.Graphics();
        app.stage.addChild(g.current);
        g.current.position.set(cx, cy)

        labels.current = new PIXI.Container();
        app.stage.addChild(labels.current);
        labels.current.position.set(cx, cy)

        return () => {
            app.view.remove()
            app.destroy()
        }
    }, [])

    useEffect(() => {
        if (!props.lines.length) {
            return
        }

        const graphics = g.current!
        graphics.clear()

        // graphics.transla(cx, cy)
        // const r = 240

        const startX = props.lines[0].start.x
        const startY = props.lines[0].start.y
        // const startX = cx + Math.cos(0) * r
        // const startY = cy + Math.sin(0) * r

        // draw a shape
        // graphics.beginFill(0xFF3300);
        // graphics.lineStyle(1, 0xffd900, 0.5)
        graphics.lineStyle(lineThickness, lineColor, lineAlpha)
        graphics.moveTo(startX, startY)

        const pins = 100
        // const angleStep = (Math.PI * 2) / pins
        props.lines.forEach((line, index, lines) => {
            if (props.highlightLast && index === lines.length - 1) {
                graphics.lineStyle(lineThickness + 2, 0xFFAA00, 1)
            }

            const { end } = line
            const { x, y } = end

            graphics.lineTo(x, y);
        })

        // graphics.lineTo(100, 400);
        // graphics.lineTo(50, 350);
        // graphics.closePath();
        graphics.endFill();
    }, [props.lines])

    useEffect(() => {
        if (!props.pins.length) {
            return
        }

        const c = labels.current!
        const l = new PIXI.Container()
        c.addChild(l)

        for (const pin of props.pins) {
            const p = new PIXI.Text(pin.label, style)
            p.x = pin.x
            p.y = pin.y
            p.anchor.set(0.5)

            l.addChild(p)
        }

        return () => {
            c.removeChild(l)
            l.destroy()
        }
    }, [props.pins])

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
