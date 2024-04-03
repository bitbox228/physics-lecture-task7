import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form, Button, Nav} from 'react-bootstrap';

const App = () => {

    const [w1, setW1] = useState(5)
    const [w2, setW2] = useState(6)
    const [a, setA] = useState(1)

    const [t, setT] = useState(10)

    const [x, setX] = useState()
    const [y, setY] = useState()
    const [aUp, setAUp] = useState()
    const [aDown, setADown] = useState()

    const handleW1Change = (e) => {
        setW1(parseFloat(e.target.value))
    }

    const handleW2Change = (e) => {
        setW2(parseFloat(e.target.value))
    }

    const handleAChange = (e) => {
        setA(parseFloat(e.target.value))
    }

    const handleTChange = (e) => {
        setT(parseFloat(e.target.value))
    }

    const checkForms = () => {
        if (w1 === '') {
            alert('Введите 1ую частоту колебания')
            return false
        }
        if (w2 === '') {
            alert('Введите 2ую частоту колебания')
            return false
        }
        if (a === '') {
            alert('Введите амплитуду')
            return false
        }
        if (t === '') {
            alert('Введите t')
            return false
        }

        if (w1 <= 0) {
            alert('Частота 1 должна быть положительной')
            return false
        }
        if (w2 <= 0) {
            alert('Частота 2 должна быть положительной')
            return false
        }
        if (a <= 0) {
            alert('Амплитуда должна быть положительной')
            return false
        }
        if (t <= 0) {
            alert('Время должно быть положительным')
            return false
        }

        return true
    }

    const handlePlotUpdate = () => {
        if (!checkForms()) {
            return
        }

        const step = t / 1000

        const newX = Array.from(
            {length: 1000},
            (_, index) => index * step
        )

        const newAUp = newX.map(time =>
            2 * a * Math.cos((w1 - w2) * time / 2)
        )

        const newADown = newAUp.map(a => -a)

        const newY = newX.map(time =>
            2 * a * Math.cos((w1 + w2) * time / 2) * Math.cos((w1 - w2) * time / 2)
        )

        setX(newX)
        setY(newY)
        setAUp(newAUp)
        setADown(newADown)
    }

    useEffect(() => {
        handlePlotUpdate()
    }, [])

    return (
        <div className={"container-fluid"}>
            <h1>Визуализация сложения колебаний. Биения.</h1>
            <Row>
                <Col xs={12} md={3}>
                    <Form>
                        <div style={{marginBottom: '10px', marginTop: '70px'}}>
                            <Form.Group controlId="w1">
                                <Form.Label>Частота колебаний 1, &#969;<sub>1</sub> (Гц)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={w1}
                                    onChange={handleW1Change}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="w2">
                                <Form.Label>Частота колебаний 2, &#969;<sub>2</sub> (Гц)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={w2}
                                    onChange={handleW2Change}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="w2">
                                <Form.Label>Амплитуда, A</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={a}
                                    onChange={handleAChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="t">
                                <Form.Label>Время, t (с)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={t}
                                    onChange={handleTChange}
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="primary" onClick={handlePlotUpdate}>Построить графики</Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={9}>
                    <Plot
                        data={[
                            {
                                x: x,
                                y: y,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Сложение колебаний',
                                line: { color: 'black' }
                            },
                            {
                                x: x,
                                y: aUp,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Амплитуда биений',
                                line: { color: 'orange' }
                            },
                            {
                                x: x,
                                y: aDown,
                                type: 'scatter',
                                mode: 'lines',
                                name: 'Амплитуда биений',
                                line: { color: 'orange' }
                            }
                        ]}
                        layout={{
                            width: '1200',
                            height: '600',
                            xaxis: {title: 'Время, с'},
                            yaxis: {title: 'Колебания'}
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default App
