import { SimulationNodeDatum, SimulationLinkDatum } from 'd3-force';

import { DataFrame, Field, IconName } from '@grafana/data';

declare module 'd3-force';

export type { Options as NodeGraphOptions, ZoomMode } from './config/panelCfg';

export type NodeDatum = SimulationNodeDatum & {
  id: string;
  title: string;
  subTitle: string;
  dataFrameRowIndex: number;
  incoming: number;
  mainStat?: Field;
  secondaryStat?: Field;
  arcSections: Field[];
  color?: Field;
  icon?: IconName;
  nodeRadius?: Field;
  highlighted: boolean;
  isInstrumented?: boolean;
};

export type NodeDatumFromEdge = NodeDatum & { mainStatNumeric?: number; secondaryStatNumeric?: number };

type LinkDatum = SimulationLinkDatum<NodeDatum> & {
  source: string;
  target: string;
};

export type EdgeDatum = LinkDatum & {
  id: string;
  mainStat: string;
  secondaryStat: string;
  dataFrameRowIndex: number;
  sourceNodeRadius: number;
  targetNodeRadius: number;
  /**
   * @deprecated -- for edges use color instead
   */
  highlighted: boolean;
  thickness: number;
  color?: string;
  strokeDasharray?: string;
};

export type EdgeDatumLayout = Omit<EdgeDatum, 'source' | 'target'> & {
  source: NodeDatum;
  target: NodeDatum;
};

export type NodesMarker = {
  node: NodeDatum;
  count: number;
};

export type GraphFrame = {
  nodes: DataFrame[];
  edges: DataFrame[];
  // eslint-disable-next-line eol-last
};