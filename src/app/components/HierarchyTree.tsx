import React from 'react';
import HierarchyNode from './HierarchyNode';

interface HierarchyNodeProps {
    word: string;
    depth: number;
    subcategories: HierarchyNodeProps[];
}

interface HierarchyTreeProps {
    root: HierarchyNodeProps;
}

const HierarchyTree: React.FC<HierarchyTreeProps> = ({ root }) => {
    return (
        <div>
            <HierarchyNode word={root.word} depth={root.depth} subcategories={root.subcategories} />
        </div>
    );
};

export default HierarchyTree;
