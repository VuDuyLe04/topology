import React from 'react';
import { PanelProps } from '@grafana/data';
import { Options as TopologyOptions } from '../../config/panelCfg';
import { css, cx } from '@emotion/css';
import { useStyles2 } from '@grafana/ui';
import { PanelDataErrorView } from '@grafana/runtime';
import { Topology } from './Topology';

interface Props extends PanelProps<TopologyOptions> { }

const getStyles = () => {
    return {
        wrapper: css`
      font-family: Open Sans;
      position: relative;
    `,
    };
};

export const SimplePanel: React.FC<Props> = ({ options, data, width, height, fieldConfig, id }) => {
    const styles = useStyles2(getStyles);

    // return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;

    if (!data || !data.series.length || data.series.length === 0) {
        return <PanelDataErrorView fieldConfig={fieldConfig} panelId={id} data={data} needsStringField />;
    }

    return (
        <div
            className={cx(
                styles.wrapper,
                css`
          width: ${width}px;
          height: ${height}px;
        `
            )}
        >
            <Topology width={width} height={height} theme={options.theme ?? 'dark'} />
        </div>
    );
    // eslint-disable-next-line eol-last
};