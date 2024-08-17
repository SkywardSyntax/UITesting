import { useCallback, useEffect, useState, FC } from 'react'
import Button from '../components/Button'
import ClickCount from '../components/ClickCount'
import GlassChip from '../components/GlassChip'
import styles from '../styles/home.module.css'

function throwError() {
  console.log(
    // The function body() is not defined
    document.body()
  )
}

const Home: FC = () => {
  const [count, setCount] = useState<number>(0)
  const increment = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  useEffect(() => {
    const r = setInterval(() => {
      increment()
    }, 1000)

    return () => {
      clearInterval(r)
    }
  }, [increment])

  useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.id = 'backgroundCanvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec4 a_position;
      void main() {
        gl_Position = a_position;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution;
        float color = 0.5 + 0.5 * sin(st.x * 10.0 + u_time - u_time * 0.1);
        gl_FragColor = vec4(vec3(color), 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1,
    ]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    function render(time) {
      gl.uniform1f(timeLocation, time * 0.001);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }

    requestAnimationFrame(render);

    return () => {
      document.body.removeChild(canvas);
    };
  }, []);

  return (
    <main className={styles.main}>
      <h1>Fast Refresh Demo</h1>
      <p>
        Fast Refresh is a Next.js feature that gives you instantaneous feedback
        on edits made to your React components, without ever losing component
        state.
      </p>
      <hr className={styles.hr} />
      <GlassChip>
        <div>
          <p>
            Auto incrementing value. The counter won't reset after edits or if
            there are errors.
          </p>
          <p>Current value: {count}</p>
        </div>
      </GlassChip>
      <hr className={styles.hr} />
      <GlassChip>
        <div>
          <p>Component with state.</p>
          <ClickCount />
        </div>
      </GlassChip>
      <hr className={styles.hr} />
      <GlassChip>
        <div>
          <p>
            The button below will throw 2 errors. You'll see the error overlay to
            let you know about the errors but it won't break the page or reset
            your state.
          </p>
          <Button
            onClick={(e) => {
              setTimeout(() => document.parentNode(), 0)
              throwError()
            }}
          >
            Throw an Error
          </Button>
        </div>
      </GlassChip>
      <hr className={styles.hr} />
    </main>
  )
}

export default Home
