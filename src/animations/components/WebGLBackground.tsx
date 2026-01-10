'use client';

import { useRef, useEffect } from 'react';
import { useDeviceCapabilities } from '@/animations/hooks/useDeviceCapabilities';

interface WebGLBackgroundProps {
  className?: string;
  type?: 'gradient' | 'noise' | 'waves' | 'plasma';
  color1?: string;
  color2?: string;
  intensity?: number;
  speed?: number;
}

export function WebGLBackground({
  className = '',
  type = 'gradient',
  color1 = '#050505',
  color2 = '#A855F7',
  intensity = 0.5,
  speed = 0.5
}: WebGLBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const capabilities = useDeviceCapabilities();
  const animationIdRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const getFragmentShader = (type: string): string => {
    switch (type) {
      case 'gradient':
        return `
          precision mediump float;
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform float u_intensity;
          
          void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            float t = u_time * ${speed.toFixed(2)};
            
            float noise = sin(st.x * 3.0 + t) * cos(st.y * 3.0 + t) * 0.1;
            float gradient = smoothstep(0.0, 1.0, st.y + noise * u_intensity);
            
            vec3 color = mix(u_color1, u_color2, gradient);
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        
      case 'noise':
        return `
          precision mediump float;
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform float u_intensity;
          
          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }
          
          float noise(vec2 st) {
            vec2 i = floor(st);
            vec2 f = fract(st);
            
            float a = random(i);
            float b = random(i + vec2(1.0, 0.0));
            float c = random(i + vec2(0.0, 1.0));
            float d = random(i + vec2(1.0, 1.0));
            
            vec2 u = f * f * (3.0 - 2.0 * f);
            
            return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
          }
          
          float fbm(vec2 st) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < 6; i++) {
              value += amplitude * noise(st);
              st *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }
          
          void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            float t = u_time * ${speed.toFixed(2)};
            
            float n = fbm(st * 3.0 + vec2(t * 0.1));
            vec3 color = mix(u_color1, u_color2, n * u_intensity);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        
      case 'waves':
        return `
          precision mediump float;
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform float u_intensity;
          
          void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            float t = u_time * ${speed.toFixed(2)};
            
            float wave1 = sin(st.x * 10.0 + t) * 0.5 + 0.5;
            float wave2 = sin(st.y * 10.0 + t * 0.8) * 0.5 + 0.5;
            float wave3 = sin((st.x + st.y) * 5.0 + t * 1.2) * 0.5 + 0.5;
            
            float waves = (wave1 + wave2 + wave3) / 3.0;
            vec3 color = mix(u_color1, u_color2, waves * u_intensity);
            
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        
      case 'plasma':
        return `
          precision mediump float;
          uniform vec2 u_resolution;
          uniform float u_time;
          uniform vec3 u_color1;
          uniform vec3 u_color2;
          uniform float u_intensity;
          
          void main() {
            vec2 st = gl_FragCoord.xy / u_resolution.xy;
            float t = u_time * ${speed.toFixed(2)};
            
            float v1 = sin(st.x * 10.0 + t);
            float v2 = sin(10.0 * (st.x * sin(t / 2.0) + st.y * cos(t / 3.0)) + t);
            float cx = st.x + 0.5 * sin(t / 5.0);
            float cy = st.y + 0.5 * cos(t / 3.0);
            float v3 = sin(sqrt(100.0 * ((cx - 0.5) * (cx - 0.5) + (cy - 0.5) * (cy - 0.5)) + 1.0) + t);
            float v = (v1 + v2 + v3) / 3.0;
            
            vec3 color = mix(u_color1, u_color2, v * u_intensity);
            gl_FragColor = vec4(color, 1.0);
          }
        `;
        
      default:
        return vertexShaderSource;
    }
  };

  const hexToRgb = (hex: string): [number, number, number] => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255
    ] : [0, 0, 0];
  };

  const hexToRgbString = (hex: string): string => {
    const [r, g, b] = hexToRgb(hex);
    return `${r.toFixed(4)}, ${g.toFixed(4)}, ${b.toFixed(4)}`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (capabilities.prefersReducedMotion || capabilities.isLowEnd) {
      return;
    }

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShaderSource = getFragmentShader(type);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      -1, 1,
      1, -1,
      1, 1
    ]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const color1UniformLocation = gl.getUniformLocation(program, 'u_color1');
    const color2UniformLocation = gl.getUniformLocation(program, 'u_color2');
    const intensityUniformLocation = gl.getUniformLocation(program, 'u_intensity');

    gl.uniform3f(color1UniformLocation, ...hexToRgb(color1));
    gl.uniform3f(color2UniformLocation, ...hexToRgb(color2));
    gl.uniform1f(intensityUniformLocation, intensity);

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const gl = canvas.getContext('webgl');
      if (!gl) return;

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      
      const currentTime = (Date.now() - startTimeRef.current) / 1000;
      const durationMultiplier = (capabilities.getAnimationDuration && capabilities.getAnimationDuration(1)) || 1;
      gl.uniform1f(timeUniformLocation, currentTime * durationMultiplier);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationIdRef.current = requestAnimationFrame(render);
    };

    const resizeCanvas = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width * window.devicePixelRatio;
        canvas.height = rect.height * window.devicePixelRatio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
      }
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(canvas.parentElement!);

    render();

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      resizeObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [type, color1, color2, intensity, speed, capabilities]);

  if (capabilities.prefersReducedMotion || capabilities.isLowEnd) {
    return null;
  }

  return <canvas ref={canvasRef} className={`absolute inset-0 ${className}`} />;
}

export function GradientBackground(props: Omit<WebGLBackgroundProps, 'type'>) {
  return <WebGLBackground {...props} type="gradient" />;
}

export function NoiseBackground(props: Omit<WebGLBackgroundProps, 'type'>) {
  return <WebGLBackground {...props} type="noise" />;
}

export function WavesBackground(props: Omit<WebGLBackgroundProps, 'type'>) {
  return <WebGLBackground {...props} type="waves" />;
}

export function PlasmaBackground(props: Omit<WebGLBackgroundProps, 'type'>) {
  return <WebGLBackground {...props} type="plasma" />;
}
