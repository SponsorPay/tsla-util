import {Apply, Component, Fun, IO} from "./component"
import {Element} from "./element"


export function render<P, N>(element: Element<P, N>, apply: IO<any, any> = p => p, context?: unknown): () => N {
  if (isComponent(element)) {
    element.context = context
    const nextApply = apply != null ? async (next: Fun) => apply(await element.apply(next)) : element.apply
    return render(element.render(), nextApply, element.getChildContext && element.getChildContext() || context)
  }
  return () => {
    return apply(async (p: any) => await p)
  }
}

function isComponent(e: any): e is Component<any, any> {
  return e != null && typeof e.render == "function"
}
