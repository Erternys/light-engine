import { AudioLoader } from "../gameobjects"

export type LoadEntityTypes = HTMLImageElement | AudioLoader | Text

export function Image(link: string): Promise<LoadEntityTypes>
export function Audio(link: string): Promise<LoadEntityTypes>
export function Text(content: string): Promise<LoadEntityTypes>
export function DOM(element: HTMLElement): Promise<LoadEntityTypes>
