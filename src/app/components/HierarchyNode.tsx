import React from 'react';

interface HierarchyNodeProps {
    word: string;
    depth: number;
    subcategories: HierarchyNodeProps[];
}

const HierarchyNode: React.FC<HierarchyNodeProps> = ({ word, depth, subcategories }) => {
    return (
        <div style={{ marginLeft: `${depth * 20}px`, borderLeft: '1px solid #ccc', paddingLeft: '10px' }}>
            <strong>{word}</strong>
            {subcategories.length > 0 && (
                <div>
                    {subcategories.map((subnode, index) => (
                        <HierarchyNode key={index} {...subnode} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HierarchyNode;
