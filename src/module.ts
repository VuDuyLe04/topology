import { FieldConfigProperty, PanelPlugin } from '@grafana/data';
import { t as i18nT } from '@grafana/i18n';
import { SimplePanel } from './components/canvas/TopologyPanel';
import { LayoutAlgorithm, Options as TopologyOptions } from './config/panelCfg';

function t(key: string, defaultValue?: string): string {
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
    const category = [t('node-graph.category-node-graph', 'Topology Graph')];
    builder.addSelect({
      name: t('node-graph.name-zoom-mode', 'Zoom mode'),
      category,
      path: 'zoomMode',
      defaultValue: 'Default',
      settings: {
        options: [
          {
            value: 'Default',
            label: t('node-graph.zoom-mode-options.label-zoom-default', 'Default'),
            description: t('node-graph.zoom-mode-options.description-zoom-default', 'Default zoom behavior'),
          },
        ],
      },
    });
    builder.addSelect({
      name: t('node-graph.name-layout-algorithm', 'Layout algorithm'),
      category,
      path: 'layoutAlgorithm',
      defaultValue: LayoutAlgorithm.Layered,
      settings: {
        options: [
          {
            label: t('node-graph.layout-algorithm-options.label-layered', 'Layered'),
            value: LayoutAlgorithm.Layered,
            description: t('node-graph.layout-algorithm-options.description-layered', 'Use a layered layout'),
          },
        ],
      },
    });
    builder.addNestedOptions({
      category: [t('node-graph.category-nodes', 'Nodes')],
      path: 'nodes',
      build: (builder) => {
        builder.addUnitPicker({
          name: t('node-graph.name-main-stat-unit', 'Main stat unit'),
          path: 'mainStatUnit',
        });
        builder.addUnitPicker({
          name: t('node-graph.name-secondary-stat-unit', 'Secondary stat unit'),
          path: 'secondaryStatUnit',
        });
      },
    });
    builder.addNestedOptions({
      category: [t('node-graph.category-edges', 'Edges')],
      path: 'edges',
      build: (builder) => {
        builder.addUnitPicker({
          name: t('node-graph.name-main-stat-unit', 'Main stat unit'),
          path: 'mainStatUnit',
        });
        builder.addUnitPicker({
          name: t('node-graph.name-secondary-stat-unit', 'Secondary stat unit'),
          path: 'secondaryStatUnit',
        });
      },
    });
  });
