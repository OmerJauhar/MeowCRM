"use client"

interface SalesFunnelProps {
  stages: {
    name: string
    value: number
  }[]
}

export function SalesFunnel({ stages }: SalesFunnelProps) {
  const maxValue = Math.max(...stages.map((stage) => stage.value))
  const colors = ["#6366f1", "#818cf8", "#a5b4fc", "#c7d2fe", "#e0e7ff"]

  return (
    <div className="space-y-2">
      {stages.map((stage, index) => {
        const width = (stage.value / maxValue) * 100
        const color = colors[index % colors.length]

        return (
          <div key={stage.name} className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-[#f8fafc]">{stage.name}</span>
              <span className="text-[#94a3b8]">{stage.value}</span>
            </div>
            <div className="h-8 bg-[#0f172a] rounded-md overflow-hidden flex items-center">
              <div
                className="h-full rounded-md flex items-center justify-center text-xs font-medium text-white"
                style={{ width: `${width}%`, backgroundColor: color }}
              >
                {width > 15 ? `${Math.round(width)}%` : ""}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 