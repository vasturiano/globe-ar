import { ThreeGlobeGeneric } from 'three-globe';

export interface ConfigOptions {
  markerAttrs?: object;
}

type hoverObj = {
  type: string;
  data: object;
}

// don't surface these internal props from inner ThreeGlobe
type ExcludedInnerProps = 'setPointOfView' | 'pauseAnimation' | 'resumeAnimation';

export interface GlobeGenericInstance<ChainableInstance>
  extends Omit<ThreeGlobeGeneric<ChainableInstance>, ExcludedInnerProps> {

  resetProps(): ChainableInstance;
  _destructor(): void;

  // Container layout
  width(): number;
  width(width: number): ChainableInstance;
  height(): number;
  height(height: number): ChainableInstance;
  yOffset(): number;
  yOffset(numMarkers: number): ChainableInstance;
  globeScale(): number;
  globeScale(globeRadii: number): ChainableInstance;

  // Interaction events
  onHover(callback: (obj: hoverObj | null, prevObj: hoverObj | null) => void): ChainableInstance;
  onClick(callback: (obj: hoverObj) => void): ChainableInstance;
}

export type GlobeInstance = GlobeGenericInstance<GlobeInstance>;

interface Globe {
  new(element: HTMLElement, configOptions?: ConfigOptions): GlobeInstance;
}

export default Globe;
