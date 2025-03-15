import { decrypt } from "@/lib/utils";

export const useAddress = () => {
    const address = sessionStorage.getItem("shipping-address");
    if (!address) {
        return null;
    }
    return decrypt(address);
};
