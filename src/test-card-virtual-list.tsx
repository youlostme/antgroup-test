/**
 * 实现 Cards 组件，支持渲染不定数量的 Card。
 * 每一行至多渲染 3 个，要求布局、间距均匀。
 * 可以根据经验，自行美化 Card 样式。
 */
import React, { useState, useEffect } from "react";

// item
{
  /* <div
key={card.name}
style={{
  backgroundColor: "#f0f0f0",
  height: 100,
}}
>
{card.name}
</div> */
}

// 考察定高 100 的虚拟列表实现
export const Cards: React.FC<{ cards: { name: string }[] }> = ({ cards }) => {
  const itemHeight = 100; // 每个列表项的高度 100
  const [containerHeight, setContainerHeight] = useState(0); // 容器可见区域高度 300
  const [visibleItems, setVisibleItems] = useState(0); // 可见区域内的列表项数量
  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      const height = container.clientHeight;
      setContainerHeight(height);
      const visible = Math.ceil(height / itemHeight);
      setVisibleItems(visible);
    }
  }, [cards]);

  // render list
  const renderList = (startIndex: number, endIndex: number) => {
    console.log("startIndex, endIndex: ", startIndex, endIndex);
    const fragment = document.createDocumentFragment(); // fragment 避免频繁回流问题
    for (let i = startIndex; i <= endIndex; i++) {
      const item = document.createElement("div");
      item.textContent = cards[i].name;
      item.style.backgroundColor = `#f0f0f0`;
      item.style.height = `${itemHeight}px`;
      fragment.appendChild(item);
    }
    const list = document.createElement("div");
    list.style.transform = `translateY(${startIndex * itemHeight}px)`;
    list.innerHTML = "";
    list.appendChild(fragment);
    return list;
  };

  const handleScroll = () => {
    const container = document.getElementById("container");
    if (container) {
      const scrollTop = container.scrollTop;
      const startIndex = Math.floor(scrollTop / itemHeight); // 已读列表项数目
      const endIndex = Math.min(startIndex + visibleItems, cards.length - 1); // 注意最后一段范围的取值
      const list = renderList(startIndex, endIndex);
      container.innerHTML = "";
      container.appendChild(list);
    }
  };

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      console.log("1", container);
      container.addEventListener("scroll", handleScroll);
      return () => {
        container.removeEventListener("scroll", handleScroll);
      };
    }
  }, [cards, visibleItems]);

  useEffect(() => {
    const list = renderList(0, Math.min(cards.length - 1, 4));
    const container = document.getElementById("container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(list);
    }
  }, [cards, visibleItems]);

  return (
    <div
      className="container"
      id="container"
      style={{
        overflowY: "scroll",
        height: "300px",
      }}
    ></div>
  );
};
