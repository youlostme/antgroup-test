/**
 * 实现 Cards 组件，支持渲染不定数量的 Card。
 * 每一行至多渲染 3 个，要求布局、间距均匀。
 * 可以根据经验，自行美化 Card 样式。
 */
import React from "react";
import "./test-card-grid.css";

/**
 * 思路
 * 1. 要考虑 item 宽度动态计算
 * 2. 要考虑 last item 间距问题
 */
export const CardsGrid: React.FC<{ cards: { name: string }[] }> = ({
  cards,
}) => {
  return (
    <div className="cards-grid-container">
      {cards.map((card) => (
        <div key={card.name} className="cards-grid-item">
          {card.name}
        </div>
      ))}
    </div>
  );
};
