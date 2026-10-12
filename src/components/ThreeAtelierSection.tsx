import React, { useEffect, useRef, useState } from 'react';
import {
  AmbientLight,
  BufferAttribute,
  Color,
  DirectionalLight,
  DoubleSide,
  FogExp2,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  WebGLRenderer,
} from 'three';
import { Calendar, Sparkles, RotateCcw } from 'lucide-react';
import { LIFESTYLE_IMAGES } from '../data/images';
import { CoutureImage } from './CoutureImage';

interface ThreeAtelierSectionProps {
  onOpenAppointment: () => void;
}

interface FabricSwatch {
  id: string;
  name: string;
  heritageNote: string;
  baseHex: string;
  sheenHex: string;
  roughness: number;
  metalness: number;
  wireOverlayOpacity: number;
}

const FABRIC_SWATCHES: FabricSwatch[] = [
  {
    id: 'burgundy-velvet',
    name: 'Deep Burgundy 9000 Velvet',
    heritageNote: 'Hand-embellished with antique gold dabka & seed pearls for royal Barat lehengas.',
    baseHex: '#5A1424',
    sheenHex: '#B8975A',
    roughness: 0.42,
    metalness: 0.28,
    wireOverlayOpacity: 0.28,
  },
  {
    id: 'ivory-organza',
    name: 'Heirloom Ivory Mulberry Organza',
    heritageNote: 'Luminous gossamer weave with shadow chikankari and antique gold zardozi borders.',
    baseHex: '#F7F3EC',
    sheenHex: '#B8975A',
    roughness: 0.25,
    metalness: 0.18,
    wireOverlayOpacity: 0.35,
  },
  {
    id: 'ink-tissue',
    name: 'Ink Black Silk & Gold Tissue',
    heritageNote: 'Evening formal weave threaded with metallic zari and cut-dana geometric lattices.',
    baseHex: '#141414',
    sheenHex: '#B8975A',
    roughness: 0.3,
    metalness: 0.45,
    wireOverlayOpacity: 0.32,
  },
  {
    id: 'antique-zardozi',
    name: 'Burnished Antique Gold Jamawar',
    heritageNote: 'Pure metallic brocade woven on traditional handlooms in Lahore’s old city.',
    baseHex: '#B8975A',
    sheenHex: '#F7F3EC',
    roughness: 0.22,
    metalness: 0.68,
    wireOverlayOpacity: 0.22,
  },
];

export const ThreeAtelierSection: React.FC<ThreeAtelierSectionProps> = ({
  onOpenAppointment,
}) => {
  const [selectedSwatch, setSelectedSwatch] = useState<FabricSwatch>(
    FABRIC_SWATCHES[0]
  );
  const [windSpeed, setWindSpeed] = useState<'gentle' | 'flowing' | 'still'>(
    'gentle'
  );
  const [webglReady, setWebglReady] = useState(true);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const materialRef = useRef<MeshPhysicalMaterial | null>(null);
  const wireMaterialRef = useRef<MeshBasicMaterial | null>(null);
  const windSpeedRef = useRef<'gentle' | 'flowing' | 'still'>('gentle');

  useEffect(() => {
    windSpeedRef.current = windSpeed;
  }, [windSpeed]);

  // Update material properties smoothly when user selects a different couture swatch
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(selectedSwatch.baseHex);
      materialRef.current.emissive.set(selectedSwatch.sheenHex);
      materialRef.current.emissiveIntensity = 0.08;
      materialRef.current.roughness = selectedSwatch.roughness;
      materialRef.current.metalness = selectedSwatch.metalness;
      materialRef.current.needsUpdate = true;
    }
    if (wireMaterialRef.current) {
      wireMaterialRef.current.opacity = selectedSwatch.wireOverlayOpacity;
      wireMaterialRef.current.needsUpdate = true;
    }
  }, [selectedSwatch]);

  // Initialize Three.js 3D Couture Silk/Velvet Drape & Zardozi Filigree Visualizer
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: WebGLRenderer | null = null;
    let frameId = 0;

    try {
      const scene = new Scene();
      scene.fog = new FogExp2('#0B0B0B', 0.045);

      const width = container.clientWidth || 640;
      const height = container.clientHeight || 460;

      const camera = new PerspectiveCamera(42, width / height, 0.1, 100);
      camera.position.set(0, 2.2, 6.2);
      camera.lookAt(0, 0, 0);

      renderer = new WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      const canvas = renderer.domElement;
      const onContextLost = (e: Event) => {
        e.preventDefault();
        cancelAnimationFrame(frameId);
        setWebglReady(false);
      };
      const onContextRestored = () => {
        setWebglReady(true);
      };
      canvas.addEventListener('webglcontextlost', onContextLost, false);
      canvas.addEventListener('webglcontextrestored', onContextRestored, false);

      // Three-Point Studio Lighting (Key, Fill, Rim)
      const ambientLight = new AmbientLight('#F7F3EC', 0.65);
      scene.add(ambientLight);

      const keyLight = new DirectionalLight('#FFF5E4', 2.2);
      keyLight.position.set(4, 6, 5);
      scene.add(keyLight);

      const fillLight = new DirectionalLight('#B8975A', 1.1);
      fillLight.position.set(-5, 3, 2);
      scene.add(fillLight);

      const rimLight = new PointLight('#5A1424', 2.4, 15);
      rimLight.position.set(0, -3, -2);
      scene.add(rimLight);

      // Sculptural Couture Drape Mesh (High-Subdivision Plane)
      const segsX = 72;
      const segsY = 72;
      const geometry = new PlaneGeometry(7.2, 4.6, segsX, segsY);
      geometry.rotateX(-Math.PI * 0.24);

      const physicalMaterial = new MeshPhysicalMaterial({
        color: new Color(selectedSwatch.baseHex),
        emissive: new Color(selectedSwatch.sheenHex),
        emissiveIntensity: 0.08,
        roughness: selectedSwatch.roughness,
        metalness: selectedSwatch.metalness,
        clearcoat: 0.35,
        clearcoatRoughness: 0.25,
        side: DoubleSide,
      });
      materialRef.current = physicalMaterial;

      const drapeMesh = new Mesh(geometry, physicalMaterial);
      scene.add(drapeMesh);

      // Overlaid Zardozi Gold Thread Lattice Wireframe
      const wireMaterial = new MeshBasicMaterial({
        color: new Color('#B8975A'),
        wireframe: true,
        transparent: true,
        opacity: selectedSwatch.wireOverlayOpacity,
      });
      wireMaterialRef.current = wireMaterial;

      const wireMesh = new Mesh(geometry, wireMaterial);
      wireMesh.position.y = 0.008;
      scene.add(wireMesh);

      // Interactive pointer tilt
      let targetRotY = 0;
      let targetRotX = 0;
      const handlePointerMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
        targetRotY = nx * 0.22;
        targetRotX = ny * 0.12;
      };
      container.addEventListener('mousemove', handlePointerMove, {
        passive: true,
      });

      const basePositions = geometry.attributes.position.array.slice() as Float32Array;

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = container.clientWidth || 640;
        const h = container.clientHeight || 460;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };
      window.addEventListener('resize', handleResize);

      let clock = 0;
      const animate = () => {
        frameId = requestAnimationFrame(animate);

        const mode = windSpeedRef.current;
        const delta =
          mode === 'still' ? 0.002 : mode === 'flowing' ? 0.028 : 0.014;
        clock += delta;

        const posAttr = geometry.attributes.position as BufferAttribute;
        for (let i = 0; i < posAttr.count; i++) {
          const bx = basePositions[i * 3];
          const by = basePositions[i * 3 + 1];
          const bz = basePositions[i * 3 + 2];

          const wave1 = Math.sin(bx * 1.15 + clock) * 0.24;
          const wave2 = Math.cos(by * 1.4 - clock * 0.8) * 0.16;
          const pleat = Math.sin(bx * 3.6 + by * 0.8 + clock * 0.5) * 0.055;

          posAttr.setXYZ(i, bx, by + (wave1 + wave2 + pleat) * 0.6, bz + wave1 * 0.5);
        }
        posAttr.needsUpdate = true;
        geometry.computeVertexNormals();

        drapeMesh.rotation.y += (targetRotY - drapeMesh.rotation.y) * 0.06;
        drapeMesh.rotation.x += (targetRotX - drapeMesh.rotation.x) * 0.06;
        wireMesh.rotation.copy(drapeMesh.rotation);

        renderer?.render(scene, camera);
      };
      animate();

      return () => {
        cancelAnimationFrame(frameId);
        container.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('resize', handleResize);
        canvas.removeEventListener('webglcontextlost', onContextLost);
        canvas.removeEventListener('webglcontextrestored', onContextRestored);
        geometry.dispose();
        physicalMaterial.dispose();
        wireMaterial.dispose();
        renderer?.dispose();
      };
    } catch {
      setWebglReady(false);
      return undefined;
    }
  }, []);

  return (
    <section
      id="liva-atelier"
      className="bg-[#0B0B0B] text-[#F7F3EC] py-24 md:py-32 border-y border-[#B8975A]/20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Row: Editorial Story & Macro Craftsmanship Photography */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch mb-20">
          {/* Left 5 Columns: Heritage & Tagline */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-[#B8975A] mb-3">
                02. THE HOUSE OF LIVA · LAHORE ATELIER
              </p>
              <h2
                className="font-serif-display font-light text-[#F7F3EC] tracking-[0.04em] leading-tight mb-4"
                style={{
                  fontSize: 'clamp(2.25rem, 3.8vw, 3.5rem)',
                  textWrap: 'balance',
                }}
              >
                Crafted for the moments that matter.
              </h2>
              <div className="w-16 h-[1px] bg-[#B8975A] my-6" />
              <p className="text-sm sm:text-base text-[#F7F3EC]/80 leading-relaxed mb-6 font-light">
                Founded on the belief that Pakistani formal and bridal couture
                is wearable architecture, LIVA unites third-generation master
                zardozi karigars with contemporary silhouette engineering.
              </p>
              <p className="text-sm sm:text-base text-[#F7F3EC]/70 leading-relaxed mb-8 font-light">
                Every bridal lehenga and kalidar pishwas undergoes up to 960
                hours of hand-guided naqshi, dabka, marori, and seed-pearl
                embellishment on pure mulberry silk organza and 9000
                micro-velvet.
              </p>
            </div>

            {/* Key Craftsmanship Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#F7F3EC]/15">
              <div>
                <p className="font-serif-display text-3xl md:text-4xl text-[#B8975A] font-mono tabular-nums">
                  960+
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#F7F3EC]/65 mt-1">
                  Artisan Hours
                </p>
              </div>
              <div>
                <p className="font-serif-display text-3xl md:text-4xl text-[#B8975A] font-mono tabular-nums">
                  100%
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#F7F3EC]/65 mt-1">
                  Pure Loom Silk
                </p>
              </div>
              <div>
                <p className="font-serif-display text-3xl md:text-4xl text-[#B8975A] font-mono tabular-nums">
                  4.9★
                </p>
                <p className="text-[11px] tracking-[0.2em] uppercase text-[#F7F3EC]/65 mt-1">
                  Client Rating
                </p>
              </div>
            </div>
          </div>

          {/* Right 7 Columns: Generated Macro Zardozi Craftsmanship Image */}
          <div className="lg:col-span-7 relative min-h-[380px] lg:min-h-[480px] border border-[#B8975A]/25 overflow-hidden bg-[#161210]">
            <CoutureImage
              src={LIFESTYLE_IMAGES.craft}
              alt="Close-up of LIVA antique gold zardozi and seed pearl hand embroidery on deep burgundy raw silk and ivory organza"
              fallbackLabel="Zardozi & Dabka Handwork Archive"
              width={1200}
              height={900}
              objectPosition="50% 50%"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#B8975A]">
                  MACRO ARCHIVE STUDY · ADDA FRAME NO. 14
                </p>
                <p className="font-serif-display text-xl text-[#F7F3EC] mt-0.5">
                  Deep Burgundy Raw Silk &amp; Ivory Organza Zardozi Pallu
                </p>
              </div>
              <button
                type="button"
                onClick={onOpenAppointment}
                className="px-5 py-2.5 bg-[#F7F3EC] text-[#0B0B0B] hover:bg-[#B8975A] text-[11px] tracking-[0.22em] uppercase font-medium transition-colors duration-150 inline-flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 stroke-[1.5]" />
                <span>Book Private Fitting</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Interactive 3D Couture Textile & Zardozi Drape Studio */}
        <div className="border border-[#F7F3EC]/15 bg-[#111010] grid grid-cols-1 lg:grid-cols-12">
          {/* Interactive 3D Viewport (7 Cols) */}
          <div className="lg:col-span-7 relative h-[380px] sm:h-[440px] w-full overflow-hidden border-b lg:border-b-0 lg:border-r border-[#F7F3EC]/15">
            {webglReady ? (
              <div
                ref={mountRef}
                className="w-full h-full cursor-grab active:cursor-grabbing"
                title="Move pointer to tilt 3D couture fabric drape"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0B0B0B] via-[#5A1424]/40 to-[#0B0B0B] p-8 text-center">
                <p className="font-serif-display text-2xl text-[#F7F3EC]">
                  {selectedSwatch.name}
                </p>
              </div>
            )}

            {/* Floating HUD Overlay (3D Spatial Guideline compliant) */}
            <div className="absolute top-4 left-4 z-10 pointer-events-none bg-[#0B0B0B]/60 backdrop-blur-sm border border-[#F7F3EC]/10 px-3.5 py-2">
              <p className="text-[10px] tracking-[0.24em] uppercase text-[#B8975A]">
                3D TEXTILE &amp; ZARI DRAPE SIMULATOR
              </p>
              <p className="text-xs text-[#F7F3EC]/90 mt-0.5">
                {selectedSwatch.name}
              </p>
            </div>

            {/* Drape Motion Controls HUD */}
            <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between gap-2 pointer-events-auto">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#F7F3EC]/60 bg-[#0B0B0B]/60 backdrop-blur-sm px-2.5 py-1.5 border border-[#F7F3EC]/10">
                Move cursor to inspect metallic sheen
              </span>

              <div className="flex items-center gap-1 bg-[#0B0B0B]/70 backdrop-blur-sm p-1 border border-[#F7F3EC]/15">
                {(['still', 'gentle', 'flowing'] as const).map((speed) => (
                  <button
                    key={speed}
                    type="button"
                    onClick={() => setWindSpeed(speed)}
                    className={`px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase transition-colors cursor-pointer whitespace-nowrap ${
                      windSpeed === speed
                        ? 'bg-[#B8975A] text-[#0B0B0B] font-medium'
                        : 'text-[#F7F3EC]/70 hover:text-[#F7F3EC]'
                    }`}
                  >
                    {speed}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Material Finish Switcher */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] tracking-[0.25em] uppercase text-[#B8975A] inline-flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 stroke-[1.5]" />
                  <span>Interactive Swatch Palette</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSwatch(FABRIC_SWATCHES[0]);
                    setWindSpeed('gentle');
                  }}
                  className="text-[11px] tracking-[0.18em] uppercase text-[#F7F3EC]/60 hover:text-[#B8975A] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              </div>

              <h3 className="font-serif-display text-2xl sm:text-3xl text-[#F7F3EC] mb-2">
                Explore Signature Textiles
              </h3>
              <p className="text-xs sm:text-sm text-[#F7F3EC]/70 leading-relaxed mb-6">
                Select a signature LIVA couture textile below to inspect how
                three-point studio lighting interacts with our zardozi metallic
                lattice and hand-woven silk drapes.
              </p>

              {/* 4 Signature Swatch Buttons */}
              <div className="space-y-2.5">
                {FABRIC_SWATCHES.map((swatch) => {
                  const active = selectedSwatch.id === swatch.id;
                  return (
                    <button
                      key={swatch.id}
                      type="button"
                      onClick={() => setSelectedSwatch(swatch)}
                      className={`w-full text-left p-3.5 border transition-all duration-150 flex items-start gap-3.5 cursor-pointer ${
                        active
                          ? 'border-[#B8975A] bg-[#F7F3EC]/8'
                          : 'border-[#F7F3EC]/12 hover:border-[#F7F3EC]/35 bg-transparent'
                      }`}
                    >
                      <span
                        className="w-6 h-6 shrink-0 mt-0.5 border border-[#B8975A]/60"
                        style={{ backgroundColor: swatch.baseHex }}
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs tracking-[0.16em] uppercase font-medium text-[#F7F3EC]">
                            {swatch.name}
                          </span>
                          {active && (
                            <span className="text-[10px] tracking-[0.2em] uppercase text-[#B8975A] shrink-0">
                              Active
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#F7F3EC]/65 mt-1 leading-relaxed">
                          {swatch.heritageNote}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[#F7F3EC]/12 flex items-center justify-between gap-4 text-xs text-[#F7F3EC]/70">
              <span>Complimentary physical swatch book with bridal consultations</span>
              <button
                type="button"
                onClick={onOpenAppointment}
                className="text-[#B8975A] hover:underline tracking-[0.18em] uppercase text-[11px] whitespace-nowrap shrink-0 cursor-pointer"
              >
                Request Swatches →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
