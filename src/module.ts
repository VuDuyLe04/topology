import { FieldConfigProperty, PanelPlugin } from '@grafana/data';
import { t as i18nT } from '@grafana/i18n';
import { SimplePanel } from './components/canvas/TopologyPanel';
import { LayoutAlgorithm, Options as TopologyOptions } from './config/panelCfg';

function t(key: string, defaultValue?: string): string {
  // Đổi node-graph thành topology-graph cho đồng bộ i18n
  if (key.startsWith('node-graph.')) {
    key = key.replace('node-graph.', 'topology-graph.');
  }
  try {
    return i18nT(key, defaultValue ?? key);
  } catch {
    return defaultValue ?? key;
  }
}

export const plugin = new PanelPlugin<TopologyOptions>(SimplePanel)
  .useFieldConfig({
    disableStandardOptions: Object.values(FieldConfigProperty).filter((v) => v !== FieldConfigProperty.Links),
  })
  .setPanelOptions((builder, context) => {
    const category = [t('topology-graph.category-node-graph', 'Topology Graph')];
    builder.addSelect({
      name: t('topology-graph.name-zoom-mode', 'Zoom mode'),
      category,
      path: 'zoomMode',
      defaultValue: 'Default',
      settings: {
        options: [
          {
            value: 'Default',
            label: t('topology-graph.zoom-mode-options.label-zoom-default', 'Default'),
            description: t('topology-graph.zoom-mode-options.description-zoom-default', 'Default zoom behavior'),
          },
        ],
      },
    });
    builder.addSelect({
      name: t('topology-graph.name-layout-algorithm', 'Layout algorithm'),
      category,
      path: 'layoutAlgorithm',
      defaultValue: LayoutAlgorithm.LayeredTopDown,
      settings: {
        options: [
          {
            label: t('topology-graph.layout-algorithm-options.label-layered-topdown', 'Layered Top Down'),
            value: LayoutAlgorithm.LayeredTopDown,
            description: t('topology-graph.layout-algorithm-options.description-layered', 'Use a layered layout'),
          },
          {
            label: t('topology-graph.layout-algorithm-options.label-layered-bottomup', 'Layered Bottom Up'),
            value: LayoutAlgorithm.LayeredBottomUp,
            description: t('topology-graph.layout-algorithm-options.description-layered', 'Use a layered layout'),
          },
          {
            label: t('topology-graph.layout-algorithm-options.label-layered-left-right', 'Layered Left Right'),
            value: LayoutAlgorithm.LayeredLeftRight,
            description: t('topology-graph.layout-algorithm-options.description-layered', 'Use a layered layout'),
          },
          {
            label: t('topology-graph.layout-algorithm-options.label-layered-right-left', 'Layered Right Left'),
            value: LayoutAlgorithm.LayeredRightLeft,
            description: t('topology-graph.layout-algorithm-options.description-layered', 'Use a layered layout'),
          },
        ],
      },
    });
    builder.addSelect({
      name: t('topology-graph.name-theme', 'Theme'),
      category,
      path: 'theme',
      defaultValue: 'dark',
      settings: {
        options: [
          {
            label: t('topology-graph.theme-options.label-dark', 'Dark'),
            value: 'dark',
          },
          {
            label: t('topology-graph.theme-options.label-light', 'Light'),
            value: 'light',
          },
        ],
      },
    });
    builder.addNestedOptions({
      category: [t('topology-graph.category-nodes', 'Nodes')],
      path: 'nodes',
      build: (builder) => {
        builder.addUnitPicker({
          name: t('topology-graph.name-main-stat-unit', 'Main stat unit'),
          path: 'mainStatUnit',
        });
        builder.addUnitPicker({
          name: t('topology-graph.name-secondary-stat-unit', 'Secondary stat unit'),
          path: 'secondaryStatUnit',
        });
      },
    });
    builder.addNestedOptions({
      category: [t('topology-graph.category-edges', 'Edges')],
      path: 'edges',
      build: (builder) => {
        builder.addUnitPicker({
          name: t('topology-graph.name-main-stat-unit', 'Main stat unit'),
          path: 'mainStatUnit',
        });
        builder.addUnitPicker({
          name: t('topology-graph.name-secondary-stat-unit', 'Secondary stat unit'),
          path: 'secondaryStatUnit',
        });
      },
    });
  });
