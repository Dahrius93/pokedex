```json https://pokeapi.co/api/v2/pokemon?limit=20&offset=0
{
  "count": number,
  "next": "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"|null,
  "previous": string | null,
  "results": [
    { "name": "string", "url": "string" },
    { "name": "string", "url": "string" }
  ]
}
```

- si può usare next per passare ai prossimi 20 pokemon

---

```json https://pokeapi.co/api/v2/pokemon/{nome}
{
"id": number,
"name": string,
"height": number,
"weight": number,
"types": [
  {
    "slot": number,
    "type": {
        "name": string,
        "url": string
    }
    }
]
}

```
