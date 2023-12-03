/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main copy.c                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/03 10:13:56 by psalame           #+#    #+#             */
/*   Updated: 2023/12/03 11:30:43 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft.h"
#include <stdbool.h>

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
		int len = ft_strlen(str);
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
	if (ft_isdigit(c) || c == 0 || c == '.')
		return (false);
	return (true);
}

bool	is_number_adjacent(char **lines, int x, int y)
{
	int	nb_len;

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
			return (true);
		if (lines[y + 1] && is_symbol(lines[y + 1][x]))
			return (true);
		if (is_symbol(lines[y][x]))
			return (true);
		x++;
	}
	ft_printf("not");
	return (false);
}

void	get_sum_adjacent_numbers(char **lines)
{
	int	y;
	int	x;
	int	sum;

	y = 0;
	sum = 0;
	while (lines[y])
	{
		x = 0;
		while (lines[y][x])
		{
			if (ft_isdigit(lines[y][x]))
			{
				if (is_number_adjacent(lines, x, y))
				{
					ft_printf("%d adjacent\n", ft_atoi(lines[y] + x));
					sum += ft_atoi(lines[y] + x);
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


int	main(void)
{
	char	**lines;
	int		lines_nb;

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
	for (int x = 0; x < lines_nb; x++)
		ft_printf("%s\n", lines[x]);
	get_sum_adjacent_numbers(lines);
}
