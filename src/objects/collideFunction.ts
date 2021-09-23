import { Entity } from "."
import Vector2 from "./Vector2"

export function collidePolygon(r1: Entity, r2: Entity) {
  let poly1 = r1
  let poly2 = r2

  for (let shape = 0; shape < 2; shape++) {
    if (shape === 1) [poly1, poly2] = [poly2, poly1]

    for (let p = 0; p < poly1.points.length; p++) {
      let line_r1s = new Vector2(poly1.x, poly1.y)
      let line_r1e = poly1.points[p]
      for (let q = 0; q < poly2.points.length; q++) {
        let line_r2s = poly2.points[q]
        let line_r2e = poly2.points[(q + 1) % poly2.points.length]

        let h =
          (line_r2e.x - line_r2s.x) * (line_r1s.y - line_r1e.y) -
          (line_r1s.x - line_r1e.x) * (line_r2e.y - line_r2s.y)
        let t1 =
          ((line_r2s.y - line_r2e.y) * (line_r1s.x - line_r2s.x) +
            (line_r2e.x - line_r2s.x) * (line_r1s.y - line_r2s.y)) /
          h
        let t2 =
          ((line_r1s.y - line_r1e.y) * (line_r1s.x - line_r2s.x) +
            (line_r1e.x - line_r1s.x) * (line_r1s.y - line_r2s.y)) /
          h

        if (t1 >= 0 && t1 < 1 && t2 >= 0 && t2 < 1) return true
      }
    }
  }

  return false
}

export function collidePolygonStatic(r1: Entity, r2: Entity) {
  let poly1 = r1
  let poly2 = r2
  let displacement = new Vector2()

  for (let shape = 0; shape < 2; shape++) {
    if (shape === 1) [poly1, poly2] = [poly2, poly1]

    for (let p = 0; p < poly1.points.length; p++) {
      let line_r1s = new Vector2(poly1.x, poly1.y)
      let line_r1e = poly1.points[p]

      for (let q = 0; q < poly2.points.length; q++) {
        let line_r2s = poly2.points[q]
        let line_r2e = poly2.points[(q + 1) % poly2.points.length]

        let h =
          (line_r2e.x - line_r2s.x) * (line_r1s.y - line_r1e.y) -
          (line_r1s.x - line_r1e.x) * (line_r2e.y - line_r2s.y)
        let t1 =
          ((line_r2s.y - line_r2e.y) * (line_r1s.x - line_r2s.x) +
            (line_r2e.x - line_r2s.x) * (line_r1s.y - line_r2s.y)) /
          h
        let t2 =
          ((line_r1s.y - line_r1e.y) * (line_r1s.x - line_r2s.x) +
            (line_r1e.x - line_r1s.x) * (line_r1s.y - line_r2s.y)) /
          h

        if (t1 >= 0 && t1 < 1 && t2 >= 0 && t2 < 1) {
          displacement.x += (1 - t1) * (line_r1e.x - line_r1s.x)
          displacement.y += (1 - t1) * (line_r1e.y - line_r1s.y)
          return displacement
        }
      }
    }
  }

  return displacement
}
