"use client";

import React, { useState } from 'react';
import styles from './page.module.css';

interface HierarchyNodeProps {
  word: string;
  depth: number;
  subcategories: HierarchyNodeProps[];
}

const initialHierarchy: HierarchyNodeProps = {
  word: 'Animais',
  depth: 1,
  subcategories: []
};

const Home: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<HierarchyNodeProps>(initialHierarchy);

  const addNode = (word: string, depth: number) => {
    const addToHierarchy = (node: HierarchyNodeProps): HierarchyNodeProps => {
      if (node.depth === depth - 1) {
        return {
          ...node,
          subcategories: [...node.subcategories, { word, depth, subcategories: [] }]
        };
      } else {
        return {
          ...node,
          subcategories: node.subcategories.map(sub => addToHierarchy(sub))
        };
      }
    };

    setHierarchy(prevHierarchy => addToHierarchy(prevHierarchy));
  };

  const saveHierarchy = () => {
    const fileData = JSON.stringify(hierarchy, null, 2);
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hierarchy.json';
    link.click();
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Crie e gerencie uma hierarquia de palavras
        </p>
      </div>

      <div className={styles.form}>
        <form onSubmit={(e) => {
          e.preventDefault();
          const wordInput = (e.target as any).elements.word.value;
          const depthInput = parseInt((e.target as any).elements.depth.value);
          if (wordInput && depthInput) {
            addNode(wordInput, depthInput);
            (e.target as any).reset();
          }
        }}>
          <input
            type="text"
            name="word"
            placeholder="Nova palavra"
            className={styles.input}
            required
          />
          <input
            type="number"
            name="depth"
            placeholder="Profundidade"
            className={styles.input}
            min="1"
            required
          />
          <button type="submit" className={styles.button}>Adicionar Nó</button>
        </form>
      </div>

      <div className={styles.grid}>
        <h2>Hierarquia Atual</h2>
        <pre className={styles.pre}>
          {JSON.stringify(hierarchy, null, 2)}
        </pre>
      </div>

      <div className={styles.grid}>
        <button onClick={saveHierarchy} className={styles.button}>Salvar Hierarquia</button>
      </div>
    </main>
  );
}

export default Home;
