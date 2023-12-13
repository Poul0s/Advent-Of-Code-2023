/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/12 18:50:20 by psalame           #+#    #+#             */
/*   Updated: 2023/12/13 16:10:54 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "header.h"
#include <pthread.h>

void	*get_possibilities(void *lineraw)
{
	char *line = lineraw;
	unsigned long long *res;
	res = malloc(sizeof(unsigned long long));
	char **data = ft_split(line, ' ');
	if (data == NULL || res == NULL)
	{
		printf("Error, not enough memory space\n");
		exit(EXIT_FAILURE);
	}
	free(line);
	char		*springs = parseSprings(data[0]);
	t_condition	condition = parseCondition(data[1]);
	free(data[0]);
	free(data[1]);
	free(data);
	int	springsLen = strlen(springs);
	*res = count_all_arrangements(springs, springsLen, condition, 0, 0, 0);
	free(springs);
	free(condition.tab);
	return (res);
}

int	main(int ac, char **av)
{
	if (ac != 2)
		printf("File name required\n");
	else
	{
		pthread_t	threads[1024];
		unsigned long long sum = 0;
		void *res;
		int		fd;
		int		linenb = 0;
		char	*line;
		fd = open(av[1], O_RDONLY);
		while ((line = get_next_line(fd)) != NULL)
		{
			if (line[strlen(line) - 1] == '\n')
				line[strlen(line) - 1] = 0;
			pthread_create(&threads[linenb], NULL, &get_possibilities, line);
			linenb++;
			// res = get_possibilities(line);
			// sum += res;
			// printf("possibilities for line %d is %lld (new total of %lld)\n", linenb, res, sum);
		}
		linenb--;
		while (linenb >= 0)
		{
			pthread_join(threads[linenb], &res);
			sum += *((unsigned long long *)res);
			printf("possibilities for line %d is %lld (new total of %lld)\n", linenb, *((unsigned long long *)res), sum);
			free(res);
			linenb--;
		}
	}
}