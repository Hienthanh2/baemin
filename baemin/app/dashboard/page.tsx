"use client";

import { fetchFoodList, getFoodCategoryList } from "@/axios";
import ScrollBar from "@/components/scrollBar";
import ScrollFood from "@/components/scrollFood";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const banneritems = [
  {
    id: "1",
    name: "anh 1",
    url: "/images/map1.png",
  },
  {
    id: "2",
    name: "anh 2",
    url: "/images/map2.png",
  },
  {
    id: "3",
    name: "anh 32",
    url: "/images/map3.png",
  },
  {
    id: "3",
    name: "anh 32",
    url: "/images/map4.png",
  },
];
const TodayFood = {
  title: "Hôm Nay ăn gì",
  items: [
    {
      id: "1",
      name: " Gà Ủ Muối Hoa Tiêu - Food",
      adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
      img: "/food/ga1.jpg",
      kind: "Quan An",
    },
    {
      id: "1",
      name: " Gà Ủ Muối Hoa Tiêu - Food",
      adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
      img: "/food/ga1.jpg",
      kind: "Quan An",
    },
    {
      id: "1",
      name: " Gà Ủ Muối Hoa Tiêu - Food",
      adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
      img: "/food/ga1.jpg",
      kind: "Quan An",
    },
    {
      id: "1",
      name: " Gà Ủ Muối Hoa Tiêu - Food",
      adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
      img: "/food/ga1.jpg",
      kind: "Quan An",
    },
    {
      id: "1",
      name: " Gà Ủ Muối Hoa Tiêu - Food",
      adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
      img: "/food/ga1.jpg",
      kind: "Quan An",
    },
    {
      id: "1",
      name: " Gà Ủ Muối Hoa Tiêu - Food",
      adrress: "4A Đường Số 71, P. Tân Quy, Quận 7, TP. HCM",
      img: "/food/ga1.jpg",
      kind: "Quan An",
    },
  ],
};
export default function Home() {
  const [categoryId, setCategoryId] = useState<undefined | number>(undefined);
  const [foodCategory, setFoodCategory] = useState<
    {
      name: string;
      id: number;
      created_at: string;
      updated_at: string;
    }[]
  >([]);
  const [foodList, setFoodList] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    getFoodList();
  }, [categoryId]);

  useEffect(() => {
    getFoodCategory();
  }, []);

  const getFoodList = async () => {
    const foodListRes = await fetchFoodList({ categoryId });
    setFoodList(foodListRes);

    console.log(foodListRes);
  };

  const getFoodCategory = async () => {
    const categoryList = await getFoodCategoryList();
    setFoodCategory(categoryList);
    console.log(categoryList);
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-3 pt-3 pl-8 pr-8  z-40">
          <div className="flex flex-col fixed  bg-white w-64 rounded-2xl  pl-3 pt-2  pb-5 gap-3  ">
            <span>Thực đơn </span>
            {foodCategory.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-3 cursor-pointer hover:bg-slate-100"
                onClick={() => setCategoryId(item.id)}
              >
                <div className="flex flex-row items-center gap-1">
                  <Image
                    src={"/images/burger.jpg"}
                    width={30}
                    height={30}
                    alt={item.name}
                  />
                  <span>{item.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-9 w-full  pt-3 pr-8 gap-3 flex flex-col">
          <ScrollBar items={banneritems}></ScrollBar>
          <ScrollFood
            items={{
              title: "Hôm Nay ăn gì",
              items: foodList.map((item) => ({
                ...item,
                adrress: "",
                img: "/food/ga1.jpg",
                kind: "Mon An",
              })),
            }}
          ></ScrollFood>
        </div>
      </div>
    </>
  );
}
