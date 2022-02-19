import { useStore } from "@/store"

export function avatarTemplate(name: string) {
    return "http://iph.href.lu/200x200?text=" + name + "&fg=3d85c6&bg=cccccc"
}

export function imageTemplate(uuid: string) {
    return useStore().imageHostURL + uuid
}
