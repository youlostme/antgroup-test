/**
 * 实现 Cards 组件，支持渲染不定数量的 Card。
 * 每一行至多渲染 3 个，要求布局、间距均匀。
 * 可以根据经验，自行美化 Card 样式。
 */
import React from "react";
import "./test-card.css";

/**
 * 思路
 * 1. 要考虑 item 宽度动态计算
 * 2. 要考虑 last item 间距问题
 */
export const Cards: React.FC<{ cards: { name: string }[] }> = ({ cards }) => {
  const columns = 3;
  const gap = 24;

  const cardWidth = `calc((100% - ${(columns - 1) * gap}px) / ${columns})`;

  return (
    <div className="cards-container">
      {cards.map((card, idx) => (
        <div
          key={card.name}
          className="cards-item"
          style={{
            width: cardWidth,
            marginRight: idx % columns === columns - 1 ? 0 : gap,
          }}
        >
          {card.name}
        </div>
      ))}
    </div>
  );
};
