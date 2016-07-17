choices = [12, 50, 400]
candies = int(input('Enter num candies + num current pokemon: '))
choice = int(input('Enter num  needed to evolve.\nPress 1 for 12, 2 for 50, or 3 for 400. '))
evolve_rate = choices[choice-1]

evolutions = 0
while candies > evolve_rate:
	candies -= (evolve_rate - 1)
	evolutions += 1
print('Evolutions pending: ', evolutions)
print('Remaining  candies: ', candies)
input('Press enter to exit')
exit()