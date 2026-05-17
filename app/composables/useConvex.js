import { ref, shallowRef, watch, onScopeDispose, toValue } from 'vue'
import { convexClient } from '../convex.js'

function getClient() {
  return convexClient
}

/**
 * Reactive Convex query that re-subscribes when args change.
 *
 *   const ping = useConvexQuery(api.ping.get)
 *   const report = useConvexQuery(api.reports.byId, () => ({ id: route.params.id }))
 */
export function useConvexQuery(queryRef, argsGetter = () => ({})) {
  const data = shallowRef(undefined)
  const error = ref(null)
  const pending = ref(true)

  const client = getClient()
  if (!client) {
    pending.value = false
    return { data, error, pending }
  }

  let unsubscribe = null

  function subscribe(args) {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
    pending.value = true
    error.value = null
    unsubscribe = client.onUpdate(
      queryRef,
      args,
      (value) => {
        data.value = value
        pending.value = false
      },
      (err) => {
        error.value = err
        pending.value = false
      }
    )
  }

  watch(
    () => toValue(argsGetter),
    (args) => subscribe(args),
    { immediate: true, deep: true }
  )

  onScopeDispose(() => {
    if (unsubscribe) unsubscribe()
  })

  return { data, error, pending }
}

/**
 * Imperative mutation/action caller.
 *
 *   const captureEmail = useConvexMutation(api.email.capture)
 *   await captureEmail({ email })
 */
export function useConvexMutation(mutationRef) {
  return async (args = {}) => {
    const client = getClient()
    if (!client) throw new Error('Convex client not available')
    return await client.mutation(mutationRef, args)
  }
}

export function useConvexAction(actionRef) {
  return async (args = {}) => {
    const client = getClient()
    if (!client) throw new Error('Convex client not available')
    return await client.action(actionRef, args)
  }
}
