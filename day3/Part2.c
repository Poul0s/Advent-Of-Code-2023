/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/03 10:13:56 by psalame           #+#    #+#             */
/*   Updated: 2023/12/03 11:45:04 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdbool.h>

typedef struct s_gear_data
{
	long	nb[2];
	long	total_nb_adj;
}	t_gear_data;

typedef struct s_pos
{
	long x;
	long y;
}		t_pos;

void	*ft_realloc(void	*old, size_t prev_size, size_t new_size)
{
	void	*new = ft_calloc(1, new_size);
	ft_memmove(new, old, prev_size);
	return (new);
}

char	*ft_remove_endl(char *str)
{
	if (str)
	{
		long len = ft_strlen(str);
		if (str[len - 1] == '\n')
		{
			if (len == 1)
				return (NULL);
			str[len - 1] = 0;
		}
	}
	return (str);
}

bool	is_symbol(char c)
{
	if (c != '*')
		return (false);
	return (true);
}

// todo list
t_pos	is_number_adjacent(char **lines, long x, long y)
{
	long	nb_len;
	t_pos res;

	nb_len = 0;
	while (ft_isdigit(lines[y][x++]))
		nb_len++;
	x = (x - nb_len) - 1;
	if (x != 0)
	{
		nb_len++;
		x--;
	}
	while (nb_len-- + 1)
	{
		if (y != 0 && is_symbol(lines[y - 1][x]))
			return ((t_pos) {x, y - 1});
		if (lines[y + 1] && is_symbol(lines[y + 1][x]))
			return ((t_pos) {x, y + 1});
		if (is_symbol(lines[y][x]))
			return ((t_pos) {x, y});
		x++;
	}
	return ((t_pos) {-1, -1});
}

void	get_sum_adjacent_numbers(char **lines)
{
	long	y;
	long	x;
	long	sum;
	t_gear_data **gear_data = ft_calloc(200, sizeof(t_gear_data *));
	for (long i = 0; i < 200; i++)
		gear_data[i] = ft_calloc(ft_strlen(lines[0]), sizeof(t_gear_data));
	t_pos adj_pos;
	
	y = 0;
	sum = 0;
	while (lines[y])
	{
		x = 0;
		while (lines[y][x])
		{
			if (ft_isdigit(lines[y][x]))
			{
				adj_pos = is_number_adjacent(lines, x, y);
				if (adj_pos.x != -1)
				{
					gear_data[adj_pos.y][adj_pos.x].nb[gear_data[adj_pos.y][adj_pos.x].total_nb_adj++] = ft_atoi(lines[y] + x);
					if (gear_data[adj_pos.y][adj_pos.x].total_nb_adj == 2)
					{
						sum += (gear_data[adj_pos.y][adj_pos.x].nb[0] * gear_data[adj_pos.y][adj_pos.x].nb[1]);
					}
				}
				while (ft_isdigit(lines[y][x]))
					x++;
			}
			else
				x++;
		}
		y++;
	}
	ft_printf("%d\n", sum);
}


long	main(void)
{
	char	**lines;
	long		lines_nb;

	lines_nb = 0;
	lines = ft_calloc(200, sizeof(char *));
	lines[lines_nb] = get_next_line(0);
	while (lines[lines_nb])
	{
		lines_nb++;
		// if (lines_nb % BUFFER_SIZE == 0)
		// 	lines = ft_realloc(lines, lines_nb * sizeof(char *), (lines_nb + 1) * sizeof(char *));
		lines[lines_nb] = ft_remove_endl(get_next_line(0));
	}
	ft_printf("%d lines\n", lines_nb);
	for (long x = 0; x < lines_nb; x++)
		ft_printf("%s\n", lines[x]);
	get_sum_adjacent_numbers(lines);
}
