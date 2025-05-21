
import svgPaths from "./svg-bthc9u1ac3";

export default function AccelerateLogo({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className="relative size-full" data-name="Accelerate Logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 3969 689"
        style={{
          transform: isActive ? "scale(1.05)" : "scale(1)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <g id="Accelerate Logo">
          <g id="Vector">
            <path d={svgPaths.p24f80c00} fill="#EDB600" fillOpacity="0.33" />
            <path d={svgPaths.p224f3a80} fill="#EDB600" fillOpacity="0.57" />
            <path d={svgPaths.p3dffb080} fill="#EDB600" />
            <path d={svgPaths.p1a860600} fill="var(--fill-0, black)" />
            <path d={svgPaths.p68d4000} fill="var(--fill-0, black)" />
            <path d={svgPaths.p24937040} fill="var(--fill-0, black)" />
            <path d={svgPaths.p16f08780} fill="var(--fill-0, black)" />
            <path d={svgPaths.pb0f6c80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1af15200} fill="var(--fill-0, black)" />
            <path d={svgPaths.p8fa5700} fill="var(--fill-0, black)" />
            <path d={svgPaths.pc796f80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p133ea300} fill="var(--fill-0, black)" />
            <path d={svgPaths.p16a52100} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
