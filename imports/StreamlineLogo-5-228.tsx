
import svgPaths from "./svg-fnivgacmuz";

export default function StreamlineLogo({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className="relative size-full" data-name="Streamline Logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 4002 535"
        style={{
          transform: isActive ? "scale(1.05)" : "scale(1)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <g id="Streamline Logo">
          <g id="Vector">
            <path d={svgPaths.p3cf0b700} fill="#C6CED7" />
            <path d={svgPaths.p307b0ef0} fill="#9BA9B9" />
            <path d={svgPaths.p1e678400} fill="#133258" />
            <path d={svgPaths.p97dc600} fill="var(--fill-0, black)" />
            <path d={svgPaths.p26b530} fill="var(--fill-0, black)" />
            <path d={svgPaths.p22a9b100} fill="var(--fill-0, black)" />
            <path d={svgPaths.p21f08200} fill="var(--fill-0, black)" />
            <path d={svgPaths.p39258a00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p10e6580} fill="var(--fill-0, black)" />
            <path d={svgPaths.pe7dcd80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p39e78300} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3311de80} fill="var(--fill-0, black)" />
            <path d={svgPaths.p3bfaa580} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
