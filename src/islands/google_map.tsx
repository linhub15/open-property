import { useEffect, useRef } from "preact/hooks";

export default function GoogleMap() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
  }, []);

  return (
    <>
      <div ref={ref} />
    </>
  );
}
