import React, { useCallback, useState } from 'react';
import {
    ReactFlow,
    Controls,
    Background,
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    Connection,
    Edge,
    Node,
    NodeChange,
    EdgeChange,
    BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { css } from '@emotion/css';

const getStyles = () => ({
    reactFlowWrapper: css`
    .react-flow__node {
      background: #1f1f1f;
      border: 2px solid #444;
      color: #ddd;
      border-radius: 50%;
      width: 80px;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .react-flow__edge-path {
      stroke: #666;
    }

    .react-flow__controls {
      button {
        background: #1f1f1f;
        border: 1px solid #444;
        color: #ddd;
        
        &:hover {
          background: #2a2a2a;
        }
      }
    }

    .react-flow__attribution {
      display: none;
    }
  `,
});

const initialNodes = [
    { id: '1', position: { x: 0, y: 0 }, data: { label: 'Node 1' } },
    { id: '2', position: { x: 0, y: 200 }, data: { label: 'Node 2' } },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

interface TopologyProps {
    width: number;
    height: number;
    theme: string;
}

export const Topology: React.FC<TopologyProps> = ({ width, height, theme }) => {
    const styles = getStyles();
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [edges, setEdges] = useState<Edge[]>(initialEdges);

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            const filteredChanges = changes.filter(change => {
                if (change.type === 'position') {
                    return change.dragging === true;
                }
                return true;
            });
            setNodes((nds) => applyNodeChanges(filteredChanges, nds));
        },
        []
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        []
    );

    const onConnect = useCallback(
        (params: Connection) => setEdges((eds) => addEdge(params, eds)),
        []
    );

    return (
        <div style={{ width: width, height: height }} className={styles.reactFlowWrapper}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                fitView
            >
                <Controls />
                <Background variant={BackgroundVariant.Dots} gap={12} size={1} color="#444" />
            </ReactFlow>
        </div>
    );
    // eslint-disable-next-line eol-last
};