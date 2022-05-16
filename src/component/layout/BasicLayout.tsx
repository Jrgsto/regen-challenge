import React from "react";
import { LoadingSpinner } from "../design";
import { Header } from "./Header";
interface IBasicLayout {
  children: JSX.Element | JSX.Element[];
  isLoading?: boolean;
}
export const BasicLayout = ({
  children,
  isLoading = false,
}: IBasicLayout): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 justify-center flex-wrap w-screen overflow-hidden overflow-x-hidden">
      <Header />
      <div className="p-4 md:p-8 lg:p-12">
        {isLoading ? <LoadingSpinner size="md" /> : children}
      </div>
    </div>
  );
};
