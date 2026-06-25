import { ORDER_STATUSES } from "@/constants/order-statuses";

export default function OrderTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = ORDER_STATUSES.indexOf(currentStatus);

  return (
    <div className="relative max-h-[50vh] overflow-y-auto pr-2 space-y-4">
      {/* Visual background track line */}
      <div className="absolute left-[17px] top-3 bottom-3 w-[1px] bg-[var(--bdr)]" />

      {ORDER_STATUSES.map((status, index) => {
        const completed = index < currentIndex;
        const active = index === currentIndex;

        return (
          <div key={status} className="relative flex items-center gap-4 group">
            {/* Step Node */}
            <div
              className="z-10 h-9 w-9 rounded-full border flex items-center justify-center font-bold text-sm transition-all duration-300"
              style={{
                backgroundColor: completed ? "var(--acc)" : "var(--bg2)",
                borderColor: completed || active ? "var(--acc)" : "var(--bdr)",
                boxShadow: active ? "0 0 0 4px var(--acc-dim)" : "none",
              }}
            >
              {completed ? (
                <span className="text-[#000] text-xs">✓</span>
              ) : (
                <span 
                  className="text-xs font-sans transition-colors"
                  style={{ color: active ? "var(--acc)" : "var(--t3)" }}
                >
                  {index + 1}
                </span>
              )}
            </div>

            {/* Step Meta text */}
            <div className="flex flex-col">
              <span
                className="text-xs font-bold tracking-wide uppercase transition-colors"
                style={{ 
                  fontFamily: "var(--ff-d)",
                  color: active ? "var(--acc)" : completed ? "var(--t2)" : "var(--t3)" 
                }}
              >
                {status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}