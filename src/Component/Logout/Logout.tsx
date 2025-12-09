"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

const Logo = () => {
    const router = useRouter();

    useEffect(() => {
        const userId = Cookie.get("userId");
        if (userId) {
            Cookie.remove("userId");
            router.push("/");
        }
        else {
            router.push("/auth");
            alert("Please Login first");
        }

    }, [router]);
    return null
};

export default Logo;


