// Three.js String Art Globe Animation
// Creates a spherical string art globe around the circular logo

let scene, camera, renderer, stringArtGlobe, particles, intersectionPoints;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let animationComplete = false;

// Color configuration
const PINK = 0xff69b4;
const PURPLE = 0x9b59b6;

// Globe parameters
const GLOBE_RADIUS = 2.5;
const POINT_COUNT = 80;
const LINE_COUNT = 200;

// Initialize Three.js scene
function initThree() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas) return;

    // Scene setup
    scene = new THREE.Scene();
    scene.background = null;

    // Camera setup
    camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 6);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create string art globe
    createStringArtGlobe();

    // Create floating particles
    createParticles();

    // Create intersection glow points
    createIntersectionPoints();

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(PINK, 0.8);
    directionalLight1.position.set(5, 5, 5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(PURPLE, 0.8);
    directionalLight2.position.set(-5, -5, 5);
    scene.add(directionalLight2);

    const pointLight = new THREE.PointLight(PINK, 0.6, 100);
    pointLight.position.set(0, 0, 10);
    scene.add(pointLight);

    // Mouse movement for parallax
    document.addEventListener('mousemove', onMouseMove, false);

    // Handle window resize
    window.addEventListener('resize', onWindowResize, false);

    // Start animation loop
    animate();
}

// Create spherical string art globe
function createStringArtGlobe() {
    stringArtGlobe = new THREE.Group();
    
    // Generate points on a sphere
    const points = generateSpherePoints(POINT_COUNT, GLOBE_RADIUS);
    
    // Store initial random positions for animation
    const initialPositions = points.map(() => ({
        x: (Math.random() - 0.5) * 10,
        y: (Math.random() - 0.5) * 10,
        z: (Math.random() - 0.5) * 10
    }));
    
    // Create lines connecting points
    const lines = [];
    const lineMaterial = new THREE.LineBasicMaterial({
        color: PINK,
        transparent: true,
        opacity: 0.6,
        linewidth: 1
    });
    
    const glowMaterial = new THREE.LineBasicMaterial({
        color: PURPLE,
        transparent: true,
        opacity: 0.3,
        linewidth: 2
    });
    
    // Connect nearby points to create string art effect
    for (let i = 0; i < LINE_COUNT; i++) {
        const p1Index = Math.floor(Math.random() * points.length);
        const p2Index = Math.floor(Math.random() * points.length);
        
        if (p1Index === p2Index) continue;
        
        const p1 = points[p1Index];
        const p2 = points[p2Index];
        
        // Calculate distance - only connect nearby points
        const dist = Math.sqrt(
            Math.pow(p1.x - p2.x, 2) + 
            Math.pow(p1.y - p2.y, 2) + 
            Math.pow(p1.z - p2.z, 2)
        );
        
        // Connect points within certain distance
        if (dist > GLOBE_RADIUS * 1.5) continue;
        
        // Create geometry with initial random positions
        const geometry = new THREE.BufferGeometry();
        const initialP1 = initialPositions[p1Index];
        const initialP2 = initialPositions[p2Index];
        
        const positions = new Float32Array([
            initialP1.x, initialP1.y, initialP1.z,
            initialP2.x, initialP2.y, initialP2.z
        ]);
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        // Create line with gradient color based on position
        const color = new THREE.Color();
        const t = Math.random();
        color.lerpColors(new THREE.Color(PINK), new THREE.Color(PURPLE), t);
        lineMaterial.color = color;
        
        const line = new THREE.Line(geometry, lineMaterial.clone());
        
        // Store animation data
        line.userData = {
            initialP1: initialP1,
            initialP2: initialP2,
            targetP1: { x: p1.x, y: p1.y, z: p1.z },
            targetP2: { x: p2.x, y: p2.y, z: p2.z },
            progress: 0,
            colorT: t
        };
        
        lines.push(line);
        stringArtGlobe.add(line);
        
        // Add glow line behind
        const glowGeometry = geometry.clone();
        const glowLine = new THREE.Line(glowGeometry, glowMaterial.clone());
        stringArtGlobe.add(glowLine);
        line.userData.glowLine = glowLine;
    }
    
    stringArtGlobe.userData.lines = lines;
    scene.add(stringArtGlobe);
    
    // Animate points from random positions to sphere positions
    animateGlobeFormation();
}

// Generate points distributed on a sphere
function generateSpherePoints(count, radius) {
    const points = [];
    
    for (let i = 0; i < count; i++) {
        // Use Fibonacci sphere distribution for even spacing
        const theta = Math.PI * (3 - Math.sqrt(5)); // Golden angle
        const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
        const radius_at_y = Math.sqrt(1 - y * y); // radius at y
        const phi = theta * i; // golden angle increment
        
        const x = Math.cos(phi) * radius_at_y;
        const z = Math.sin(phi) * radius_at_y;
        
        points.push({
            x: x * radius,
            y: y * radius,
            z: z * radius
        });
    }
    
    return points;
}

// Animate globe formation using GSAP
function animateGlobeFormation() {
    if (!stringArtGlobe.userData.lines) return;
    
    const lines = stringArtGlobe.userData.lines;
    const duration = 3;
    const stagger = 0.01;
    
    lines.forEach((line, index) => {
        const delay = index * stagger;
        
        gsap.to(line.userData, {
            progress: 1,
            duration: duration,
            delay: delay,
            ease: "power2.out",
            onUpdate: function() {
                const progress = line.userData.progress;
                const pos = line.geometry.attributes.position.array;
                
                // Interpolate positions
                pos[0] = line.userData.initialP1.x + 
                    (line.userData.targetP1.x - line.userData.initialP1.x) * progress;
                pos[1] = line.userData.initialP1.y + 
                    (line.userData.targetP1.y - line.userData.initialP1.y) * progress;
                pos[2] = line.userData.initialP1.z + 
                    (line.userData.targetP1.z - line.userData.initialP1.z) * progress;
                
                pos[3] = line.userData.initialP2.x + 
                    (line.userData.targetP2.x - line.userData.initialP2.x) * progress;
                pos[4] = line.userData.initialP2.y + 
                    (line.userData.targetP2.y - line.userData.initialP2.y) * progress;
                pos[5] = line.userData.initialP2.z + 
                    (line.userData.targetP2.z - line.userData.initialP2.z) * progress;
                
                line.geometry.attributes.position.needsUpdate = true;
                
                // Update glow line
                if (line.userData.glowLine) {
                    const glowPos = line.userData.glowLine.geometry.attributes.position.array;
                    glowPos[0] = pos[0];
                    glowPos[1] = pos[1];
                    glowPos[2] = pos[2];
                    glowPos[3] = pos[3];
                    glowPos[4] = pos[4];
                    glowPos[5] = pos[5];
                    line.userData.glowLine.geometry.attributes.position.needsUpdate = true;
                }
                
                // Update color based on progress (pink to purple gradient)
                const color = new THREE.Color();
                color.lerpColors(
                    new THREE.Color(PINK), 
                    new THREE.Color(PURPLE), 
                    line.userData.colorT * progress
                );
                line.material.color = color;
            },
            onComplete: function() {
                if (index === lines.length - 1) {
                    animationComplete = true;
                }
            }
        });
    });
}

// Create floating particles
function createParticles() {
    const particleCount = 150;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount * 3; i += 3) {
        // Position particles around the globe
        const radius = GLOBE_RADIUS + (Math.random() * 2);
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        positions[i] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i + 2] = radius * Math.cos(phi);

        // Pink to purple gradient colors
        const colorT = Math.random();
        const pink = new THREE.Color(PINK);
        const purple = new THREE.Color(PURPLE);
        const color = new THREE.Color().lerpColors(pink, purple, colorT);
        
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
        
        sizes[i / 3] = Math.random() * 0.03 + 0.01;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// Create glowing points at line intersections
function createIntersectionPoints() {
    intersectionPoints = new THREE.Group();
    const pointCount = 60;
    
    for (let i = 0; i < pointCount; i++) {
        const geometry = new THREE.SphereGeometry(0.03, 8, 8);
        
        // Pink to purple gradient material
        const colorT = Math.random();
        const color = new THREE.Color().lerpColors(
            new THREE.Color(PINK), 
            new THREE.Color(PURPLE), 
            colorT
        );
        
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: 0.9
        });
        
        const point = new THREE.Mesh(geometry, material);
        
        // Position on sphere surface
        const radius = GLOBE_RADIUS * 0.9;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        
        point.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
        
        // Animate glow
        point.userData = {
            baseScale: Math.random() * 0.5 + 0.5,
            speed: Math.random() * 0.02 + 0.01,
            baseOpacity: 0.7 + Math.random() * 0.3
        };
        
        intersectionPoints.add(point);
    }
    
    scene.add(intersectionPoints);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate globe slowly
    if (stringArtGlobe) {
        // Continuous rotation
        stringArtGlobe.rotation.y += 0.002;
        stringArtGlobe.rotation.x += 0.001;
        
        // Parallax rotation based on mouse
        const targetRotationY = mouseX * 0.0002;
        const targetRotationX = mouseY * 0.0002;
        
        stringArtGlobe.rotation.y += targetRotationY * 0.1;
        stringArtGlobe.rotation.x += targetRotationX * 0.1;
    }

    // Animate particles
    if (particles) {
        particles.rotation.y += 0.0003;
        particles.rotation.x += 0.0002;
        
        // Update particle positions for floating effect
        const positions = particles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] += Math.sin(Date.now() * 0.001 + i) * 0.0003;
        }
        particles.geometry.attributes.position.needsUpdate = true;
    }

    // Animate intersection points
    if (intersectionPoints) {
        intersectionPoints.children.forEach((point, index) => {
            const time = Date.now() * point.userData.speed + index;
            const scale = point.userData.baseScale + Math.sin(time) * 0.3;
            point.scale.set(scale, scale, scale);
            point.material.opacity = point.userData.baseOpacity + Math.sin(time) * 0.2;
        });
    }

    // Camera parallax movement (subtle)
    camera.position.x += (mouseX * 0.0002 - camera.position.x) * 0.05;
    camera.position.y += (-mouseY * 0.0002 - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Mouse movement handler
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

// Window resize handler
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initThree);
} else {
    initThree();
}
