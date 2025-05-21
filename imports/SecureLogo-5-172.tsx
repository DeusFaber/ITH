
import svgPaths from "./svg-psno0xnqtp";

export default function SecureLogo({ isActive = false }: { isActive?: boolean }) {
  return (
    <div className="relative size-full" data-name="Secure Logo">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 2743 688"
        style={{
          transform: isActive ? "scale(1.05)" : "scale(1)",
          transition: "transform 500ms cubic-bezier(0.4, 0, 0.2, 1)"
        }}
      >
        <g id="Secure Logo">
          <g id="Vector">
            <path d={svgPaths.p6fdad00} fill="#FFB4CC" />
            <path d={svgPaths.p35da3d00} fill="#FFEFF4" />
            <path d={svgPaths.p1d601600} fill="#FF246B" />
            <path d={svgPaths.p1a0d4a80} fill="var(--fill-0, black)" />
            <path d={svgPaths.pf065680} fill="var(--fill-0, black)" />
            <path d={svgPaths.p2aa4d400} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1d68c80} fill="var(--fill-0, black)" />
            <path d={svgPaths.pca89980} fill="var(--fill-0, black)" />
            <path d={svgPaths.p26ffdc80} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
