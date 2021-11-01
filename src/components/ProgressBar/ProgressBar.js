/* eslint-disable no-unused-vars */
/**
 * GOTCHAS
 * -------
 * 1. We added `overflow: hidden;` to ensure that the progress bar appears
 *    rounded on the left hand side when we approach 100%
 * 2. We had to pollute the dom a bit with an extra div - `BarWrapper`
 *    we did this so that on the `large` size, which adds padding, we would
 *    be able to keep the rounded corners on the left hand side of the progress
 *    bar.
 * 3. On the `large` size, which has padding, we had to tweak the border radius of the
 *    wrapper so that the corners don't look as if there is more than 4px of space between
 *    the wrapper and the visual element of the bar. The formula is the delta between both sizes and then
 *    add half of that amount to the outer radius. So we had a 4px radius on both elements which translates
 *    to
 *      - get the delta: 4px + 4px = 8px.
 *      - halve the delta: 8/2 = 4
 *      - add that halved value to the outer radius: the radius for our wrappers border at the large size is
 *        now 8px instead of 4px.
 */
import React from "react";
import styled from "styled-components";

import { COLORS } from "../../constants";
import VisuallyHidden from "../VisuallyHidden";

const STYLES = {
  small: {
    height: 8,
    padding: 0,
    radius: 4,
  },
  medium: {
    height: 12,
    padding: 0,
    radius: 4,
  },
  large: {
    height: 16,
    padding: 4,
    radius: 8,
  },
};

const Bar = styled.div`
  width: var(--width);
  height: var(--height);
  background-color: ${COLORS.primary};
  border-radius: 4px 0 0 4px;
`;

const Wrapper = styled.div`
  background-color: ${COLORS.transparentGray15};
  box-shadow: inset 0px 2px 4px ${COLORS.transparentGray35};

  border-radius: var(--radius);
  padding: var(--padding);
`;

const BarWrapper = styled.div`
  border-radius: var(--radius);
  /* trim off corners when progress bar in near full */
  overflow: hidden;
`;

const ProgressBar = ({ value, size }) => {
  const styles = STYLES[size];

  if (!styles) {
    throw new Error(`Unknown size passed to ProgressBar: ${size}`);
  }
  return (
    <Wrapper
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin="0"
      aria-valuemax="100"
      style={{
        "--padding": styles.padding + "px",
        "--radius": styles.radius + "px",
      }}
    >
      <VisuallyHidden>{value}%</VisuallyHidden>
      <BarWrapper>
        <Bar
          style={{
            "--width": value + "%",
            "--height": styles.height + "px",
            "--padding": styles.padding + "px",
          }}
        />
      </BarWrapper>
    </Wrapper>
  );
};

export default ProgressBar;
