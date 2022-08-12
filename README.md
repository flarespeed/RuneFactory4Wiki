# RuneFactory4Wiki
an attempt at a wiki for Rune Factory 4 that actually links items to where they come from, unlike the currently available wikis

### pages:
- list of areas
- map of each area
- description of each subarea
  - list area it belongs to
  - list exits
  - list monsters
- description of each monster
  - list items dropped by monster
- description of each item

### models:
- Area
  - provides names for each map section
- Subarea
  - has connections to other subareas, and belongs in a specific Area group
  - has a list of monsters found in the subarea
- Monster
  - has connections to all subareas it can be found in
  - has list of items it drops

uses react, mongodb, express, concurrently.
