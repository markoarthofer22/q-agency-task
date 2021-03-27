import pathseq from 'pathseg';
import decomp from 'poly-decomp';
import Matter from 'matter-js';

let aa = typeof window !== 'undefined' ? (window.decomp = decomp) : null;

export default class MatterJS {
    constructor(_scene) {
        this.sceneRef = _scene;
        this.timeouts = [];
        this.init();
    }

    init() {
        this.destroy();

        this.brakepoint = typeof window !== 'undefined' ? window.getComputedStyle(document.body, '::before').content.replace(/\"/g, '') : null;

        this.engine = Matter.Engine.create({});
        const { width, height } = this.sceneRef.getBoundingClientRect();

        this.render = Matter.Render.create({
            element: this.sceneRef, //this.refs.scene,
            engine: this.engine,
            options: {
                width: width,
                height: height,
                wireframes: false,
                background: 'transparent'
            }
        });

        //Ako nije mobile
        if (typeof window.orientation === 'undefined') {
            this.mouseHandler();
        }

        Matter.World.add(this.engine.world, [
            // walls
            //top wall
            Matter.Bodies.rectangle(width / 2, -120, width, 2, {
                isStatic: true,
                render: {
                    fillStyle: 'transparent'
                }
            }),
            //bottom wall
            Matter.Bodies.rectangle(width / 2, height, width, 1, {
                isStatic: true,
                render: {
                    fillStyle: 'transparent'
                }
            }),
            //left wall
            Matter.Bodies.rectangle(0, height / 2, 2, height, {
                isStatic: true,
                render: {
                    fillStyle: 'transparent'
                }
            }),
            //right wall
            Matter.Bodies.rectangle(width, height / 2, 2, height, {
                isStatic: true,
                render: {
                    fillStyle: 'transparent'
                }
            })
        ]);

        Matter.Engine.run(this.engine);
        Matter.Render.run(this.render);

        if (typeof window.orientation === 'undefined') {
            window.addEventListener('resize', () => {
                clearTimeout(this.timeout2);
                this.timeout2 = setTimeout(() => {
                    this.init();
                }, 1000);
            });
        }

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.createBulbs(0, 0, 12);
        }, 1000);

        setTimeout(() => {
            if (typeof window.orientation !== 'undefined') {
                window.addEventListener(
                    'deviceorientation',
                    event => {
                        var orientation = window.orientation,
                            gravity = this.engine.world.gravity;

                        if (orientation === 0) {
                            gravity.x = (Matter.Common.clamp(event.gamma, -90, 90) / 90) * 10;
                            gravity.y = (Matter.Common.clamp(event.beta, -90, 90) / 90) * 10;
                        } else if (orientation === 180) {
                            gravity.x = (Matter.Common.clamp(event.gamma, -90, 90) / 90) * 10;
                            gravity.y = (Matter.Common.clamp(-event.beta, -90, 90) / 90) * 10;
                        } else if (orientation === 90) {
                            gravity.x = Matter.Common.clamp(event.beta, -90, 90) / 90;
                            gravity.y = Matter.Common.clamp(-event.gamma, -90, 90) / 90;
                        } else if (orientation === -90) {
                            gravity.x = Matter.Common.clamp(-event.beta, -90, 90) / 90;
                            gravity.y = Matter.Common.clamp(event.gamma, -90, 90) / 90;
                        }
                    },
                    true
                );
            }
        }, 2000);
    }

    mouseHandler() {
        // add mouse control
        var mouse = Matter.Mouse.create(this.render.canvas),
            mouseConstraint = Matter.MouseConstraint.create(this.engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });

        this.mouse = mouse;
        Matter.World.add(this.engine.world, mouseConstraint);
        this.mouse.element.removeEventListener('mousewheel', this.mouse.mousewheel);
        this.mouse.element.removeEventListener('DOMMouseScroll', this.mouse.mousewheel);
    }

    createBulbs(x, y, count) {
        let texBulb = [
            {
                texture: '/assets/kugla1_small.png',
                path:
                    '<svg><path d="M197.971,33.773C246.655,33.773 290.617,54.154 321.783,86.841C351.059,117.547 369.044,159.113 369.044,204.846C369.044,251.444 350.373,293.716 320.111,324.581C289.054,356.256 245.791,375.919 197.971,375.919C154.72,375.919 115.196,359.834 85.061,333.324C49.41,301.963 26.898,256.013 26.898,204.846C26.898,159.182 44.829,117.672 74.027,86.98C105.201,54.212 149.218,33.773 197.971,33.773Z" /></svg>'
            },
            {
                texture: '/assets/orasar3_small.png',
                path: '<svg><path d="M311.598,42.972L60.199,42.972L60.199,758.807L311.598,758.807L311.598,42.972Z" /></svg>'
            },
            {
                texture: '/assets/srce1_small.png',
                path:
                    '<svg><path d="M197.971,33.773C246.655,33.773 290.617,54.154 321.783,86.841C351.059,117.547 369.044,159.113 369.044,204.846C369.044,251.444 350.373,293.716 320.111,324.581C289.054,356.256 245.791,375.919 197.971,375.919C154.72,375.919 115.196,359.834 85.061,333.324C49.41,301.963 26.898,256.013 26.898,204.846C26.898,159.182 44.829,117.672 74.027,86.98C105.201,54.212 149.218,33.773 197.971,33.773Z" /></svg>'
            },
            {
                texture: '/assets/stup1-small.png',
                path: '<svg><path d="M311.598,42.972L60.199,42.972L60.199,758.807L311.598,758.807L311.598,42.972Z" /></svg>'
            }
        ];
        let vertexSets = [];
        const { width, height } = this.sceneRef.getBoundingClientRect();

        if (typeof window !== 'undefined') {
            if (!('SVGPathSeg' in window)) {
                Matter.Common.warn('Svg.pathToVertices: SVGPathSeg not defined, a polyfill is required.');
            }
        }

        for (var i = 0; i <= count; i++) {
            var pickedTexBulb = texBulb[Math.floor(Math.random() * texBulb.length)];

            var placeholder = document.createElement('div');
            placeholder.innerHTML = pickedTexBulb.path;
            let _path = placeholder.getElementsByTagName('path')[0];

            let scales = [
                {
                    xy: 0.45,
                    v: 0.4
                },
                {
                    xy: 0.2,
                    v: 0.15
                }
            ];

            let scale = this.brakepoint === 'x-small' ? 1 : 0;

            var v = Matter.Bodies.fromVertices(
                Math.random() * width,
                0,
                Matter.Svg.pathToVertices(_path, 30),
                {
                    render: {
                        strokeStyle: 'darkgrey',
                        fillStyle: 'grey',
                        sprite: {
                            texture: pickedTexBulb.texture,
                            xScale: scales[scale].xy,
                            yScale: scales[scale].xy
                        }
                    }
                },
                true
            );

            Matter.Body.scale(v, scales[scale].v, scales[scale].v);
            Matter.Body.rotate(v, (Math.PI / Math.random()) * 360);
            Matter.Body.setAngularVelocity(v, Math.PI / 20);
            vertexSets.push(v);
        }

        Matter.World.add(this.engine.world, vertexSets);
    }

    destroy() {
        window.removeEventListener('resize', () => {
            this.init();
        });

        if (this.render && this.engine) {
            clearTimeout(this.timeout);
            clearTimeout(this.timeout2);
            Matter.World.clear(this.engine.world);
            Matter.Engine.clear(this.engine);
            this.engine = null;
            this.world = null;
            this.render.canvas.remove();
        }
    }
}
