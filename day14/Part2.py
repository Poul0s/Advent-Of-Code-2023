import sys
from math import floor

f = open(sys.argv[1], "r")
map = []
for line in f:
	if line[len(line) - 1] == '\n':
		line = line[:len(line) - 1]
	map.append(list(line))


def countChargesNorth(map):
	y = 0
	x = 0
	charges = 0
	while y < len(map):
		x = 0
		while (x < len(map[y])):
			if (map[y][x] == 'O'):
				charges += len(map) - y
			x = x + 1
		y = y + 1
	return (charges)

def slideRocksDirection(map, direction):
	y = len(map) - 1 if direction == 2 else 0
	while (y >= 0 if direction == 2 else y < len(map)):
		x = len(map[y]) - 1 if direction == 3 else 0
		while (x >= 0 if direction == 3 else x < len(map[y])):
			if (map[y][x] == 'O'):
				if (direction == 0 or direction == 2):
					slideCoord = y
					target = 0 if direction == 0 else len(map) - 1
					incrementor = -1 if direction == 0 else 1
					while (slideCoord != target and map[slideCoord + incrementor][x] == '.'):
						slideCoord += incrementor
					map[y][x] = '.'
					map[slideCoord][x] = 'O'
				else:
					slideCoord = x
					target = 0 if direction == 1 else len(map[y]) - 1
					incrementor = -1 if direction == 1 else 1
					while (slideCoord != target and map[y][slideCoord + incrementor] == '.'):
						slideCoord += incrementor
					map[y][x] = '.'
					map[y][slideCoord] = 'O'
			x += -1 if direction == 3 else 1
		y += -1 if direction == 2 else 1


def rawMap(map):
	newMap = []
	for line in map:
		newMap.append(''.join(line))
	return ("\n".join(newMap))

s = {}
nbCycles = 1000000000
i = 0
print(rawMap(map), "\n")
while (i < nbCycles):
	j = 0
	while (j < 4):
		slideRocksDirection(map, j)
		j += 1
	raw = rawMap(map)
	if (rawMap(map) in s):
		nbCycleForMap = i - s[raw]
		print("new correspondance at ", i)
		while (i + nbCycleForMap < nbCycles):
			i += nbCycleForMap
		s = {}
		print("new cycle : ", i, i / nbCycles * 100)
	else:
		s[raw] = i
	i += 1
print(rawMap(map))
print(countChargesNorth(map))