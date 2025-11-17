import { useEffect, useRef, useState } from "react";
import { Range } from "react-range";

type RangeItem = { values: number[] };

type Props = {
  videoId: string;
};

declare global {
  interface Window {
    YT: any;
  }
}

const YoutubeSmartRangePicker: React.FC<Props> = ({ videoId }) => {
  const playerRef = useRef<any>(null);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [ranges, setRanges] = useState<RangeItem[]>([{ values: [0, 5] }]);

  // Load YT Player API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player("yt-player", {
        videoId,
        events: {
          onReady: (e: any) => {
            const d = e.target.getDuration();
            setDuration(d);
          },
          onStateChange: () => {},
        },
      });
    };
  }, [videoId]);

  // Auto update current time while playing
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        setCurrentTime(playerRef.current.getCurrentTime());
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const updateRange = (index: number, values: number[]) => {
    const cloned = [...ranges];
    cloned[index].values = values;
    setRanges(cloned);
  };

  const addRange = () => {
    if (ranges.length >= 5 || duration === 0) return;
    setRanges([...ranges, { values: [0, Math.min(5, duration)] }]);
  };

  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "Inter" }}>
      <div
        id="yt-player"
        style={{
          width: "100%",
          height: "320px",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #333",
        }}
      />

      {duration === 0 ? (
        <p style={{ marginTop: 20 }}>Loading video duration…</p>
      ) : (
        <>
          <div style={{ marginTop: 30 }}>
            <div style={{ marginBottom: 10, opacity: 0.7 }}>
              Current time: {currentTime.toFixed(1)}s / {duration}s
            </div>

            {/* Progress bar that moves with player */}
            <div
              style={{
                height: "6px",
                width: "100%",
                background: "#333",
                borderRadius: "8px",
                marginBottom: 30,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  height: "6px",
                  width: `${(currentTime / duration) * 100}%`,
                  background: "#ff2626",
                  borderRadius: "8px",
                  transition: "width 0.2s linear",
                }}
              />
            </div>

            {/* Dynamic sliders */}
            {ranges.map((item, index) => (
              <div key={index} style={{ marginBottom: 40 }}>
                <Range
                  step={0.1}
                  min={0}
                  max={duration}
                  values={item.values}
                  onChange={(values) => updateRange(index, values)}
                  renderTrack={({ props, children }) => (
                    <div
                      {...props}
                      style={{
                        height: "10px",
                        width: "100%",
                        background: "#222",
                        borderRadius: "10px",
                        position: "relative",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          left: `${(item.values[0] / duration) * 100}%`,
                          width: `${
                            ((item.values[1] - item.values[0]) / duration) * 100
                          }%`,
                          height: "10px",
                          background: "#ff4d4d",
                          borderRadius: "10px",
                        }}
                      />
                      {children}
                    </div>
                  )}
                  renderThumb={({ props }) => (
                    <div
                      {...props}
                      style={{
                        height: "20px",
                        width: "20px",
                        borderRadius: "50%",
                        background: "#fff",
                        border: "3px solid #ff1a1a",
                      }}
                    />
                  )}
                />

                <div
                  style={{
                    marginTop: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    opacity: 0.8,
                  }}
                >
                  <span>{item.values[0].toFixed(1)}s</span>
                  <span>{item.values[1].toFixed(1)}s</span>
                </div>
              </div>
            ))}

            {ranges.length < 5 && (
              <button
                onClick={addRange}
                style={{
                  padding: "10px 18px",
                  background: "#ff1a1a",
                  color: "#fff",
                  borderRadius: "10px",
                  border: 0,
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: 600,
                }}
              >
                Add Range
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default YoutubeSmartRangePicker;
