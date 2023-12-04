/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: psalame <psalame@student.42.fr>            +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2023/12/02 09:46:12 by psalame           #+#    #+#             */
/*   Updated: 2023/12/02 10:23:48 by psalame          ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "libft/header/libft.h"
#include <stdbool.h>

const int	cubes_limit[3] = {12, 13, 14};

int	get_cube_color(char *str)
{
	while (!ft_isalpha(*str))
		str++;
	if (*str == 'r')
		return (0);
	if (*str == 'g')
		return (1);
	if (*str == 'b')
		return (2);
}

bool	is_set_valid(char *set)
{
	char	**cubes;
	int		nb_cubes;
	int		cube_color;

	cubes = ft_split(set, ',');
	while (*cubes)
	{
		nb_cubes = ft_atoi(*cubes);
		cube_color = get_cube_color(*cubes);
		if (cubes_limit[cube_color] < nb_cubes)
			return (false);
		cubes++;
	}
	return (true);
}

int	get_valid_game_id(char *str)
{
	int		game_id;
	char	**sets;

	game_id = ft_atoi(str + ft_strlen("Game "));
	while (*str != ':')
		str++;
	str++;
	sets = ft_split(str, ';');
	while (*sets)
	{
		if (!is_set_valid(*sets++))
			return (0);
	}
	ft_printf("game id %d good\n", game_id);
	return (game_id);
}

int	get_max_sum(char *str)
{
	char	maxs[3] = {0};
	int		nb_cubes = 0;
	int		color_id;

	while (*str != ':')
		str++;
	str++;
	while (*str)
	{
		nb_cubes = ft_atoi(str);
		color_id = get_cube_color(str);
		if (maxs[color_id] < nb_cubes)
			maxs[color_id] = nb_cubes;
		while (*str == ' ' || ft_isdigit(*str))
			str++;
		while (!ft_isdigit(*str) && *str != 0)
			str++;
	}
	return (maxs[0] * maxs[1] * maxs[2]);
}

void	main(void)
{
	int		total = 0;
	char	*line;

	line = get_next_line(0);
	while (line)
	{
		total += get_max_sum(line);// get_valid_game_id(line);
		free(line);
		line = get_next_line(0);
	}
	ft_printf("%d\n", total);
}
