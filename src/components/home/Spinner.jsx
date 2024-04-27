function Spinner({ size = 100, message = '로딩 중...', ...restProps }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ margin: 'auto' }}
      width={size}
      height={size}
      display="block"
      preserveAspectRatio="xMidYMid"
      viewBox="0 0 100 100"
      {...restProps}
    >
      <title>{message}</title>
      <circle cx="84" cy="50" r="10" fill="#6663f0">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="0.625s"
          keySplines="0 0.5 0.5 1"
          keyTimes="0;1"
          repeatCount="indefinite"
          values="10;0"
        ></animate>
        <animate
          attributeName="fill"
          begin="0s"
          calcMode="discrete"
          dur="2.5s"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="#6663f0;#9bd7b9;#ffbac7;#ffdc60;#6663f0"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#6663f0">
        <animate
          attributeName="r"
          begin="0s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="0s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
      <circle cx="50" cy="50" r="10" fill="#ffdc60">
        <animate
          attributeName="r"
          begin="-0.625s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="-0.625s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
      <circle cx="84" cy="50" r="10" fill="#ffbac7">
        <animate
          attributeName="r"
          begin="-1.25s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="-1.25s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
      <circle cx="16" cy="50" r="10" fill="#9bd7b9">
        <animate
          attributeName="r"
          begin="-1.875s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="0;0;10;10;10"
        ></animate>
        <animate
          attributeName="cx"
          begin="-1.875s"
          calcMode="spline"
          dur="2.5s"
          keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1"
          keyTimes="0;0.25;0.5;0.75;1"
          repeatCount="indefinite"
          values="16;16;16;50;84"
        ></animate>
      </circle>
    </svg>
  );
}

export default Spinner;
