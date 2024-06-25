# generate_members.py

def make_row(entry1, entry2):
	row = f"""
	         <div class="row">
	{entry1}

	{entry2}
	         </div>
	         <br>
	"""
	return row

def make_entry(user):
	name      = user['name']
	imagefile = user['image']
	degree    = user['course']

	url_type_to_icon = {'linkedin':'fab fa-linkedin fa-1x', 'twitter':'fab fa-twitter fa-1x', 'academia':'fas fa-university', 'website':'fas fa-globe'}

	links = [ (x, user[x]) for x in ['linkedin','twitter','website', 'academia' ] ]
	links_string = ''
	for link in links:
		url_type, url = link
		if url != '-':
			icon = url_type_to_icon[url_type]
			links_string += f'<a href="{url}" class="is-icon"><i class="{icon}"></i></a> '

	interests = user['interests']
	interests_string = ''
	if interests != '-':
		interests_string = f'<p class="psmall">Interests: {interests}</p>'

	entry = f"""
	           <div class="column">
	             <div>
	               <img src="../images/members/{imagefile}", height="130px" border="1px" align="left" class="profilepic">
	               <h4><b>{name} </b>{links_string}</h4>
	               <p class="psmall">{degree}</p>
	               {interests_string}
	             </div> 
	           </div>
	"""
	return entry

#-----------------------------------------------#

# Read inputs

import pandas as pd

infile = 'members_list.xlsx'
current_members = pd.read_excel(infile, sheet_name='current_members').fillna('-')
alumni = pd.read_excel('members_list.xlsx', sheet_name='alumni').fillna('-')

infile = 'members_template.html'
with open(infile) as f:
	out_str = f.read()

# Process current members
entries = [ make_entry(row) for _, row in current_members.iterrows() ]
if len(entries) % 2:
	entries += ['']
rows = [ make_row(i,j) for i,j in zip(entries[::2], entries[1::2]) ]
current_members_str = '\n'.join(rows)

# Process alumni
entries = [ make_entry(row) for _, row in alumni.iterrows() ]
if len(entries) % 2:
	entries += ['']
rows = [ make_row(i,j) for i,j in zip(entries[::2], entries[1::2]) ]
alumni_str = '\n'.join(rows)

# Print output

out_str = out_str.replace('CURRENT_MEMBERS_GO_HERE', current_members_str)
out_str = out_str.replace('ALUMNI_GO_HERE', alumni_str)

outfile = '../members.html'
with open(outfile, 'w') as f:
	f.write(out_str)

