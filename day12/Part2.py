import sys

f = open(sys.argv[1], "r")
map = []
for line in f:
	if line[len(line) - 1] == '\n':
		line = line[:len(line) - 1]
	line = line.split(' ')
	
	line[0] = (line[0] + '?') * 5
	line[0] = list(line[0][:len(line[0]) - 1])
	
	line[1] = line[1].split(',') * 5
	line[1] = [int(cond) for cond in line[1]]
	
	map.append(line)


def count_all_arrangements(springs, index, conditionIndex, conditionCount, s):
	if index == len(springs[0]):
		return conditionIndex == len(springs[1]) or (conditionIndex == len(springs[1]) - 1 and conditionCount == springs[1][conditionIndex])
	elif (springs[0][index] == '?'):
		rawSpr = str(conditionIndex) + ' ' + ''.join(springs[0][index:])
		if (conditionCount == 0 and rawSpr in s):
			return (s[rawSpr])

		res = 0
		springs[0][index] = '.'
		res += count_all_arrangements(springs, index, conditionIndex, conditionCount, s)
		
		springs[0][index] = '#'
		res += count_all_arrangements(springs, index, conditionIndex, conditionCount, s)
		
		springs[0][index] = '?'

		if (conditionCount == 0):
			s[rawSpr] = res
		return res
	else:
		if (springs[0][index] == '#'):
			if (conditionIndex == len(springs[1]) or conditionCount + 1 > springs[1][conditionIndex]):
				return 0
			else:
				return count_all_arrangements(springs, index + 1, conditionIndex, conditionCount + 1, s)
		else:
			if (conditionCount != 0):
				if (conditionCount < springs[1][conditionIndex]):
					return 0
				else:
					return count_all_arrangements(springs, index + 1, conditionIndex + 1, 0, s)
			else:
				return count_all_arrangements(springs, index + 1, conditionIndex, 0, s)

sum = 0
for springs in map:
	s = {}
	sum += count_all_arrangements(springs, 0, 0, 0, s)
print(sum)