(define-map donations principal uint)

(define-public (donate (amount uint))
  (begin
    (map-set donations tx-sender amount)
    (ok true)
  )
)

(define-read-only (get-donation (user principal))
  (ok (default-to u0 (map-get? donations user)))
)
